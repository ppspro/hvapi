import { AuthService } from '../application/use-cases/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuthRepository: any;
  let mockJwtService: any;
  let mockConfigService: any;

  beforeEach(() => {
    mockAuthRepository = {
      db: {
        user: {
          findUnique: jest.fn().mockResolvedValue({ id: 'user-123', phone: '+14155552671', status: 'ACTIVE' }),
        },
      },
      findUserByPhone: jest.fn(),
      createUser: jest.fn(),
      createOtp: jest.fn(),
      findOtpByChallengeId: jest.fn(),
      markOtpVerified: jest.fn(),
      incrementOtpAttempts: jest.fn(),
      incrementOtpResends: jest.fn(),
      createSession: jest.fn().mockResolvedValue({ id: 'session-123' }),
      findActiveSessions: jest.fn().mockResolvedValue([]),
      invalidateSession: jest.fn(),
      invalidateAllSessions: jest.fn(),
      invalidateOtherSessions: jest.fn(),
      createRefreshToken: jest.fn(),
      findRefreshToken: jest.fn().mockResolvedValue(null),
      revokeRefreshToken: jest.fn(),
      revokeAllUserTokens: jest.fn(),
      createAuditLog: jest.fn(),
      findUserRoles: jest.fn().mockResolvedValue(['PATIENT']),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('mock.jwt.token'),
      verify: jest.fn().mockReturnValue({ sub: 'user-123' }),
      decode: jest.fn().mockReturnValue({ sub: 'user-123' }),
    } as unknown as JwtService;

    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'JWT_EXPIRATION') return '15m';
        if (key === 'REFRESH_TOKEN_EXPIRATION') return '7d';
        return null;
      }),
    } as unknown as ConfigService;

    service = new AuthService(
      mockAuthRepository,
      mockJwtService,
      mockConfigService,
    );
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
