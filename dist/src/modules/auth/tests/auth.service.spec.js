"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../application/use-cases/auth.service");
describe('AuthService', () => {
    let service;
    let mockAuthRepository;
    let mockJwtService;
    let mockConfigService;
    beforeEach(() => {
        mockAuthRepository = {
            findUserByPhone: jest.fn(),
            createUser: jest.fn(),
            createOtp: jest.fn(),
            findOtpByChallengeId: jest.fn(),
            markOtpVerified: jest.fn(),
            createSession: jest.fn(),
            createRefreshToken: jest.fn(),
            revokeAllUserTokens: jest.fn(),
        };
        mockJwtService = {
            sign: jest.fn().mockReturnValue('mock.jwt.token'),
            verify: jest.fn().mockReturnValue({ sub: 'user-123' }),
            decode: jest.fn().mockReturnValue({ sub: 'user-123' }),
        };
        mockConfigService = {
            get: jest.fn().mockImplementation((key) => {
                if (key === 'JWT_EXPIRATION')
                    return '15m';
                if (key === 'REFRESH_TOKEN_EXPIRATION')
                    return '7d';
                return null;
            }),
        };
        service = new auth_service_1.AuthService(mockAuthRepository, mockJwtService, mockConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('requestOtp', () => {
        it('should create user if phone not found and return challengeId', async () => {
            mockAuthRepository.findUserByPhone.mockResolvedValue(null);
            mockAuthRepository.createUser.mockResolvedValue({ id: 'user-123', phone: '+14155552671' });
            mockAuthRepository.createOtp.mockResolvedValue({ id: 'challenge-456' });
            const result = await service.requestOtp({ phone: '+14155552671' });
            expect(mockAuthRepository.createUser).toHaveBeenCalledWith('+14155552671');
            expect(mockAuthRepository.createOtp).toHaveBeenCalled();
            expect(result.challengeId).toBe('challenge-456');
        });
        it('should reuse existing user if phone already registered', async () => {
            mockAuthRepository.findUserByPhone.mockResolvedValue({ id: 'user-existing', phone: '+14155552671' });
            mockAuthRepository.createOtp.mockResolvedValue({ id: 'challenge-789' });
            const result = await service.requestOtp({ phone: '+14155552671' });
            expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
            expect(result.challengeId).toBe('challenge-789');
        });
    });
    describe('logout', () => {
        it('should revoke all tokens and return success', async () => {
            const result = await service.logout({ refreshToken: 'valid.refresh.token' });
            expect(mockAuthRepository.revokeAllUserTokens).toHaveBeenCalledWith('user-123');
            expect(result.success).toBe(true);
            expect(result.message).toBe('Logged out successfully');
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map