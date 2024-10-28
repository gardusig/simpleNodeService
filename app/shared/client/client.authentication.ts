import { Logger } from "@nestjs/common";
import { isJWT } from "class-validator";
import * as jwt from "jsonwebtoken";

import {
  TokenClient,
  TokenClientInterface,
} from "../token-service/client/token.client";

export interface AuthenticationClientInterface {
  getAuthHeaders(): Promise<Record<string, string>>;
}

interface AuthenticationToken {
  accessToken: string | null;
  refreshToken: string | null;
}

export class AuthenticationClient implements AuthenticationClientInterface {
  protected readonly logger = new Logger(AuthenticationClient.name);

  private readonly tokenClient: TokenClientInterface;
  private readonly authenticationToken: AuthenticationToken;

  constructor(
    tokenClient?: TokenClientInterface,
    accessToken?: string,
    refreshToken?: string,
  ) {
    this.tokenClient = tokenClient ?? new TokenClient();
    this.authenticationToken = {
      accessToken: accessToken ?? null,
      refreshToken: refreshToken ?? null,
    };
  }

  public async getAuthHeaders(): Promise<Record<string, string>> {
    if (!this.authenticationToken) {
      return {};
    }
    const token = await this.getToken();
    if (!token) {
      this.logger.debug("Failed to get valid token");
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  }

  private async getToken(): Promise<string | null> {
    if (this.isAuthenticationTokenValid()) {
      return this.authenticationToken.accessToken;
    }
    if (this.authenticationToken.refreshToken) {
      try {
        const tokenResponse = await this.tokenClient.refreshAuthenticationToken(
          this.authenticationToken.refreshToken,
        );
        this.authenticationToken.accessToken = tokenResponse.accessToken;
      } catch (error) {
        this.logger.error("Token refresh failed", error);
      }
    }
    if (!this.isAuthenticationTokenValid()) {
      try {
        const tokenResponse =
          await this.tokenClient.createAuthenticationToken();
        this.authenticationToken.accessToken = tokenResponse.accessToken;
        this.authenticationToken.refreshToken =
          tokenResponse.refreshToken || null;
      } catch (error) {
        this.logger.error("Token creation failed", error);
      }
    }
    return this.isAuthenticationTokenValid()
      ? this.authenticationToken.accessToken
      : null;
  }

  private isAuthenticationTokenValid(): boolean {
    if (
      !this.authenticationToken.accessToken ||
      !isJWT(this.authenticationToken.accessToken)
    ) {
      this.logger.debug(
        `Invalid authentication token: ${this.authenticationToken.accessToken}`,
      );
      return false;
    }
    return !isTokenExpired(this.authenticationToken.accessToken);
  }
}

function isTokenExpired(token: string): boolean {
  const decoded: any = jwt.decode(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
