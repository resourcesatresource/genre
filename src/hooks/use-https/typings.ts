export interface HttpsResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    execute: Function
    success: boolean | null;
    serverIdle: boolean;
}