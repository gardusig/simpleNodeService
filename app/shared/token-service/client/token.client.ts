import { Logger } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface TokenClientInterface {
  createAuthenticationToken(): Promise<TokenResponse>;
  refreshAuthenticationToken(token: string): Promise<TokenResponse>;
}

// TODO
// export interface TokenClientOptions {
//   baseUrl: string;
//   loginAPI: string;
//   refreshTokenAPI: string;
// }

// const DefaultClientOptions: TokenClientOptions = {
//   baseUrl: "http://localhost:3000/api",
//   loginAPI: "auth/login",
//   refreshTokenAPI: "auth/refresh",
// };

export class TokenClient implements TokenClientInterface {
  protected readonly logger = new Logger(TokenClient.name);
  // private readonly axiosInstance: AxiosInstance;

  // constructor(clientOptions: TokenClientOptions = DefaultClientOptions) {
  //   this.axiosInstance = createAxiosInstance(clientOptions.baseUrl);
  // }

  public async createAuthenticationToken(): Promise<TokenResponse> {
    this.logger.debug("Creating authentication token...");
    const response = {
      data: {
        accessToken: generateToken(),
        refreshToken: generateToken(),
      },
    };
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  }

  public async refreshAuthenticationToken(): Promise<TokenResponse> {
    this.logger.debug("Refreshing authentication token...");
    const response = {
      data: {
        accessToken: generateToken(),
      },
    };
    return {
      accessToken: response.data.accessToken,
    };
  }
}

function generateToken(): string {
  return jwt.sign(
    {
      userId: "123456",
      username: "exampleUser",
    },
    "your_secret_key",
    {
      expiresIn: "5m",
    },
  );
}
