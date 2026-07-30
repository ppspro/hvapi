export interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    meta?: {
        timestamp: string;
        traceId?: string;
        page?: number;
        limit?: number;
        totalItems?: number;
        totalPages?: number;
    };
}
export interface ApiErrorResponse {
    success: false;
    statusCode: number;
    error: string;
    message: string | string[];
    meta: {
        timestamp: string;
        path: string;
        traceId?: string;
    };
}
