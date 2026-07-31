export declare class ProfileCompletionSectionDto {
    section: string;
    completed: boolean;
    missingFields?: string[];
}
export declare class ProfileCompletionResponseDto {
    completionPercentage: number;
    status: string;
    sections: ProfileCompletionSectionDto[];
}
export declare class ProfileTimelineEventDto {
    action: string;
    fieldChanged?: string;
    timestamp: string;
}
export declare class ProfileTimelineResponseDto {
    events: ProfileTimelineEventDto[];
}
