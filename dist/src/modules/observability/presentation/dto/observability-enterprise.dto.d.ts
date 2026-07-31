export declare class CreateMetricDto {
    metricCategory: string;
    metricName: string;
    metricValue: number;
    unit?: string;
    metadata?: any;
}
export declare class CreateLogDto {
    severity?: string;
    module?: string;
    requestId?: string;
    traceId?: string;
    message: string;
    context?: any;
}
export declare class CreateTraceDto {
    traceId: string;
    operation: string;
    metadata?: any;
}
export declare class RecordHealthCheckDto {
    component: string;
    status?: string;
    responseTimeMs?: number;
    details?: any;
}
