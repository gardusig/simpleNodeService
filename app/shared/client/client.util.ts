import axios, { AxiosError, AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

export function createAxiosInstance(baseURL: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: `${baseURL}`,
    timeout: 5 * 1000,
  });
  setupRetryLogic(axiosInstance);
  return axiosInstance;
}

function setupRetryLogic(axiosInstance: AxiosInstance) {
  axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: (retryCount: number) => {
      console.log(`Retry attempt: ${retryCount}`);
      return (1 << retryCount) * 1000;
    },
    retryCondition: (error: AxiosError) => {
      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response?.status !== undefined && error.response.status >= 500)
      );
    },
  });
}
