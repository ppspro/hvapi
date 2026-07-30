import { FacilityService } from '../application/use-cases/facility.service';
import { Logger } from 'nestjs-pino';

describe('FacilityService', () => {
  let service: FacilityService;
  let mockFacilityRepository: any;
  let mockLogger: any;

  beforeEach(() => {
    mockFacilityRepository = {
      findAllFacilities: jest.fn(),
      findFacilityById: jest.fn(),
      findDepartmentsByFacilityId: jest.fn(),
      findDoctorsByFacilityId: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
    } as unknown as Logger;

    service = new FacilityService(mockFacilityRepository, mockLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listFacilities', () => {
    it('should list all facilities', async () => {
      mockFacilityRepository.findAllFacilities.mockResolvedValue([
        { id: 'fac-1', name: 'Mayo Clinic', address: '123 St', phone: '+14155551234', createdAt: new Date(), updatedAt: new Date() }
      ]);

      const result = await service.listFacilities();

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Mayo Clinic');
    });
  });
});
