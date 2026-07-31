export declare class StepProgressDto {
    step: number;
    name: string;
    completed: boolean;
}
export declare class OnboardingProgressResponseDto {
    completionPercentage: number;
    status: string;
    steps: StepProgressDto[];
}
