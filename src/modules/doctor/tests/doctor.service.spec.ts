import { DoctorService } from '../application/use-cases/doctor.service';
import { Logger } from 'nestjs-pino';

describe('DoctorService', () => {
  let service: DoctorService;
  let mockDoctorRepository: any;
  let mockLogger: any;

  beforeEach(() => {
    mockDoctorRepository = {
      findDoctorById: jest.fn(),
      findSlotsByDoctorId: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
    } as unknown as Logger;

    service = new DoctorService(mockDoctorRepository, mockLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDoctorProfile', () => {
    it('should return doctor profile details', async () => {
      mockDoctorRepository.findDoctorById.mockResolvedValue({
        id: 'doc-123',
        fullName: 'Dr. Watson',
        specialization: 'General',
        credentials: 'MD',
      });

      const result = await service.getDoctorProfile('doc-123');

      expect(result.fullName).toBe('Dr. Watson');
    });
  });
});
