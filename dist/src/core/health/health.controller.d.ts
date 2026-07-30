import { DatabaseService } from "../../database/database.service";
export declare class HealthController {
    private readonly db;
    constructor(db: DatabaseService);
    getHealth(): {
        status: string;
        timestamp: string;
        service: string;
    };
    getReadiness(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
    getLiveness(): {
        status: string;
        uptimeSeconds: number;
        timestamp: string;
    };
}
