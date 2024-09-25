import { Logger } from "@nestjs/common";
import axios, { AxiosInstance, AxiosResponse, Method } from "axios";
import * as https from "https";

import { FULL_CLIENT_CONFIG, getServerUrl } from "../../constants";

const MAX_RETRIES = 3;
const SERVER_URL = getServerUrl();

const axiosInstance: AxiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

type Response = Promise<AxiosResponse<any>>;

type MethodGetAll = (requestHeader: Record<string, string>) => Response;
type MethodGetById = (
  requestHeader: Record<string, string>,
  id: string,
) => Response;
type MethodCreate = (
  requestHeader: Record<string, string>,
  data: any,
) => Response;
type MethodUpdateById = (
  requestHeader: Record<string, string>,
  id: string,
  data: any,
) => Response;
type MethodDeleteById = (
  requestHeader: Record<string, string>,
  id: string,
) => Response;

interface ClientMethodConfig {
  getAll?: boolean;
  get?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

export abstract class AbstractClient {
  protected readonly logger = new Logger(AbstractClient.name);

  getAll?: MethodGetAll;
  get?: MethodGetById;
  create?: MethodCreate;
  update?: MethodUpdateById;
  delete?: MethodDeleteById;

  constructor(
    apiPrefix: string,
    config: ClientMethodConfig = FULL_CLIENT_CONFIG,
  ) {
    this.configureMethods(apiPrefix, config);
  }

  private configureMethods(
    apiPrefix: string,
    config: ClientMethodConfig,
  ): void {
    const baseUrl = `${SERVER_URL}/${apiPrefix}`;
    if (config.getAll) {
      this.getAll = this.createGetAllMethod(baseUrl);
    }
    if (config.get) {
      this.get = this.createGetByIdMethod(baseUrl);
    }
    if (config.create) {
      this.create = this.createCreateMethod(baseUrl);
    }
    if (config.update) {
      this.update = this.createUpdateByIdMethod(baseUrl);
    }
    if (config.delete) {
      this.delete = this.createDeleteByIdMethod(baseUrl);
    }
  }

  private createGetAllMethod(baseUrl: string): MethodGetAll {
    return async (requestHeader: Record<string, string>) => {
      return await this.makeRequestWithRetry("get", requestHeader, baseUrl);
    };
  }

  private createGetByIdMethod(baseUrl: string): MethodGetById {
    return async (requestHeader: Record<string, string>, id: string) => {
      const url = `${baseUrl}/${id}`;
      return await this.makeRequestWithRetry("get", requestHeader, url);
    };
  }

  private createCreateMethod(baseUrl: string): MethodCreate {
    return async (requestHeader: Record<string, string>, data: any) => {
      return await this.makeRequestWithRetry(
        "post",
        requestHeader,
        baseUrl,
        data,
      );
    };
  }

  private createUpdateByIdMethod(baseUrl: string): MethodUpdateById {
    return async (
      requestHeader: Record<string, string>,
      id: string,
      data: any,
    ) => {
      const url = `${baseUrl}/${id}`;
      return await this.makeRequestWithRetry("put", requestHeader, url, data);
    };
  }

  private createDeleteByIdMethod(baseUrl: string): MethodDeleteById {
    return async (requestHeader: Record<string, string>, id: string) => {
      const url = `${baseUrl}/${id}`;
      return await this.makeRequestWithRetry("delete", requestHeader, url);
    };
  }

  private async makeRequestWithRetry(
    method: Method,
    requestHeader: Record<string, string>,
    url: string,
    data?: any,
  ): Response {
    for (let retries = 0; retries < MAX_RETRIES; retries += 1) {
      if (retries > 0) {
        const sleepTimeMs = 1 << retries;
        const sleepTimeSeconds = sleepTimeMs * 1000;
        await new Promise((resolve) => setTimeout(resolve, sleepTimeSeconds));
      }
      try {
        this.logger.debug(
          `[attempt #${retries}] making request at: ${url}` +
            `, method: ${method}` +
            `, header: ${JSON.stringify(requestHeader)}` +
            `, body: ${JSON.stringify(data)}`,
        );
        const response = await axiosInstance({
          method: method,
          url: url,
          data: data,
          headers: requestHeader,
        });
        this.logger.debug(
          `[attempt #${retries}] received response from: ${url}` +
            `, method: ${method}` +
            `, response_status: ${response.status}` +
            `, response_data: ${JSON.stringify(response.data)}`,
        );
        return response;
      } catch (error) {
        if (this.isNetworkError(error)) {
          this.logger.warn(
            `[attempt #${retries}] network error making request to: ${url}` +
              `, method: ${method}` +
              `, header: ${JSON.stringify(requestHeader)}` +
              `, body: ${JSON.stringify(data)}` +
              `, error: ${error}`,
          );
        } else {
          this.logger.warn(
            `[attempt #${retries}] received response with error from: ${url}` +
              `, method: ${method}` +
              `, header: ${JSON.stringify(requestHeader)}` +
              `, body: ${JSON.stringify(data)}` +
              `, error: ${error}`,
          );
          throw error;
        }
      }
    }
    throw new Error(`Function failed after ${MAX_RETRIES} attempts`);
  }

  private isNetworkError(error: any): boolean {
    return axios.isAxiosError(error) && !error.response;
  }
}
