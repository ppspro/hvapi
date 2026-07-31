export declare class UserEntity {
    id: string;
    phone: string;
    status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
    createdAt: Date;
    updatedAt: Date;
}
export declare class AuthOtpEntity {
    id: string;
    userId: string;
    otpHash: string;
    expiresAt: Date;
    isVerified: boolean;
    attempts: number;
    resendCount: number;
    createdAt: Date;
}
export declare class RefreshTokenEntity {
    id: string;
    userId: string;
    tokenHash: string;
    isRevoked: boolean;
    expiresAt: Date;
    createdAt: Date;
}
