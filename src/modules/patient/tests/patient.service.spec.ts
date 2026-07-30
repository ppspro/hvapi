import { PatientService } from '../application/use-cases/patient.service';

describe('PatientService', () => {
  let service: PatientService;
  let mockPatientRepository: any;

  beforeEach(() => {
    mockPatientRepository = {
      findProfileByUserId: jest.fn(),
      findProfileById: jest.fn(),
      createProfile: jest.fn(),
      updateProfile: jest.fn(),
      createEmergencyContact: jest.fn(),
      updateEmergencyContact: jest.fn(),
      findEmergencyContactByProfileId: jest.fn(),
      createFamilyConsent: jest.fn(),
      findConsentById: jest.fn(),
      updateConsentStatus: jest.fn(),
      createFamilyMember: jest.fn(),
    };

    service = new PatientService(mockPatientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onboardDemographics', () => {
    it('should create new patient profile if it does not exist', async () => {
      mockPatientRepository.findProfileByUserId.mockResolvedValue(null);
      mockPatientRepository.createProfile.mockResolvedValue({
        id: 'new-profile-uuid',
        firstName: 'John',
        lastName: 'Doe',
      });

      const result = await service.onboardDemographics('user-123', {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
      });

      expect(mockPatientRepository.createProfile).toHaveBeenCalled();
      expect(result.profileId).toBe('new-profile-uuid');
      expect(result.nextStep).toBe(3);
    });
  });

  describe('onboardEmergencyInfo', () => {
    it('should create emergency contact details linked to profile', async () => {
      mockPatientRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
      mockPatientRepository.findEmergencyContactByProfileId.mockResolvedValue(null);
      mockPatientRepository.createEmergencyContact.mockResolvedValue({ id: 'contact-123' });

      const result = await service.onboardEmergencyInfo('user-123', {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+14155552671',
      });

      expect(mockPatientRepository.createEmergencyContact).toHaveBeenCalledWith('profile-123', {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+14155552671',
      });
      expect(result.contactId).toBe('contact-123');
      expect(result.nextStep).toBe(4);
    });
  });
});
