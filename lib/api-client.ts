import axios, { type AxiosInstance, AxiosError } from "axios";

export class ApiClient {
    protected readonly axiosInstance: AxiosInstance;

    constructor(baseURL: string = "/api") {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response.data,
            (error: AxiosError) => {
                const message = (error.response?.data as string) || error.message;
                throw new Error(message);
            }
        );
        this.axiosInstance.interceptors.response.use(
            (response) => response.data,
            (error: AxiosError) => {
                const message = error.response?.data
                    ? (typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data))
                    : error.message;

                console.error("API Error Details:", error.response?.data);
                throw new Error(message);
            }
        );
    }
}