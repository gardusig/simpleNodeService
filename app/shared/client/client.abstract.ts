import { Logger } from "@nestjs/common";
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import {
  AuthenticationClient,
  AuthenticationClientInterface,
} from "./client.authentication";
import { createAxiosInstance } from "./client.util";

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

export abstract class AbstractApiClient<
  CreateRequestDto,
  UpdateRequestDto,
  ResponseDto,
  ResponseListDto,
> {
  protected readonly logger = new Logger(AbstractApiClient.name);

  private readonly axiosInstance: AxiosInstance;
  private authenticationClient: AuthenticationClientInterface | null;

  constructor(baseURL: string, resourcePath: string) {
    this.axiosInstance = createAxiosInstance(`${baseURL}/${resourcePath}`);
    this.authenticationClient = null;
    this.initializeInterceptors();
  }

  public withAuthenticationClient(
    authenticationClient: AuthenticationClient,
  ): AbstractApiClient<
    CreateRequestDto,
    UpdateRequestDto,
    ResponseDto,
    ResponseListDto
  > {
    this.authenticationClient = authenticationClient;
    return this;
  }

  public async findAll(): Promise<ApiResponse<ResponseListDto>> {
    return await this.makeApiRequest<undefined, ResponseListDto>(
      `/`,
      "get",
      undefined,
      `Failed to fetch all entities`,
    );
  }

  public async create(
    entity: CreateRequestDto,
  ): Promise<ApiResponse<ResponseDto>> {
    return this.makeApiRequest<CreateRequestDto, ResponseDto>(
      `/`,
      "post",
      entity,
      `Failed to create entity`,
    );
  }

  public async update(
    id: string,
    entity: UpdateRequestDto,
  ): Promise<ApiResponse<ResponseDto>> {
    return this.makeApiRequest<UpdateRequestDto, ResponseDto>(
      `/${id}`,
      "put",
      entity,
      `Failed to update entity with ID ${id}`,
    );
  }

  public async remove(id: string): Promise<ApiResponse<ResponseDto>> {
    return this.makeApiRequest<undefined, ResponseDto>(
      `/${id}`,
      "delete",
      undefined,
      `Failed to delete entity with ID ${id}`,
    );
  }

  public async findById(id: string): Promise<ApiResponse<ResponseDto>> {
    return this.makeApiRequest<undefined, ResponseDto>(
      `/${id}`,
      "get",
      undefined,
      `Failed to fetch entity with ID ${id}`,
    );
  }

  protected async makeApiRequest<RequestDto, ResponseDto>(
    url: string,
    method: "get" | "post" | "put" | "delete",
    data?: RequestDto,
    errorMessage?: string,
  ): Promise<ApiResponse<ResponseDto>> {
    try {
      const response = await this.axiosInstance.request({
        url,
        method,
        data,
      });
      this.logger.debug(
        `Received client response: ${JSON.stringify(response.data)}`,
      );
      return { data: response.data };
    } catch (error) {
      return this.handleApiError(error, errorMessage || `API request failed`);
    }
  }

  private initializeInterceptors() {
    this.initializeRequestInterceptors();
    this.initializeResponseInterceptors();
  }

  private handleApiError<ResponseDto>(
    error: unknown,
    message: string,
  ): ApiResponse<ResponseDto> {
    let statusCode: number | null = null;
    let errorMessage = message;
    let errorBody = null;
    if (error instanceof AxiosError) {
      statusCode = error.response?.status ?? null;
      errorBody = error.response?.data ?? null;
      if (error.response) {
        // Server responded with a status code outside 2xx
        this.logger.error(
          `${message}, status: ${statusCode}, body: ${JSON.stringify(errorBody)}`,
        );
        errorMessage += `, status: ${statusCode}, body: ${JSON.stringify(errorBody)}`;
      } else if (error.request) {
        // Request was made but no response was received
        this.logger.error(`${message}, no response received`, error.request);
        errorMessage += `, no response received`;
      } else {
        // Something happened while setting up the request
        this.logger.error(`${message}, request setup error`, error.message);
        errorMessage += `, request setup error: ${error.message}`;
      }
    } else {
      // Non-Axios errors (for example, coding issues)
      this.logger.error(message, error);
    }
    return {
      data: null,
      error: errorMessage,
    };
  }

  private initializeResponseInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.logger.error("API call failed:", error);
        return Promise.reject(error);
      },
    );
  }

  private initializeRequestInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (!this.authenticationClient) {
          return config;
        }
        const authHeaders = await this.authenticationClient.getAuthHeaders();
        Object.entries(authHeaders).forEach(([key, value]) => {
          config.headers?.set(key, value as string);
        });
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );
  }
}
