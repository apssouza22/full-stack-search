import {useState} from "react";

interface RequestOptions {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: { [key: string]: string };
    body?: any;
}

interface UseFetchError {
    status: number,
    statusText: string
}

export interface FetchResult<T> {
    data?: T,
    status: number,
    isLoading: boolean,
    error?: UseFetchError
}

interface UseRestAPI {
    loading: boolean;
    httpController: AbortController
    get: <T>(url: string, headers?: { [key: string]: string }) => Promise<FetchResult<T>>;
}

export const useRestAPI = (baseUrl: string): UseRestAPI => {
    const [loading, setLoading] = useState<boolean>(false);
    const [httpController, setHttpController] = useState<AbortController>();

    const makeRequest = async <T>(url: string, options: RequestOptions = {}): Promise<FetchResult<T>> => {
        const result: FetchResult<T> = {
            isLoading: true,
            status: 200
        }
        const controller = new AbortController();
        try {
            setHttpController(controller);
            setLoading(true);
            const params = {
                signal: controller.signal,
                method: options.method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                body: JSON.stringify(options.body),
            };
            if (params.method === "GET") {
                delete params.body;
            }
            const response = await fetch(`${baseUrl}${url}`, params);

            result.data = await response.json();
            result.status = response.status;

            if (!response.ok) {
                result.error = {
                    status: response.status,
                    statusText: response.statusText
                }
                return result;
            }
            return result;
        } catch (err: any) {
            console.log("error", err)
            result.error = {
                status: 500,
                statusText: err.message || "An error occurred"
            }
            return result;
        } finally {
            setLoading(false);
        }
    };

    const get = async <T>(url: string, headers?: { [key: string]: string }): Promise<FetchResult<T>> => {
        return await makeRequest<T>(url, {method: "GET", headers});
    };

    return {
        loading,
        httpController,
        get
    };
};
