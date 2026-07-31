"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patient_service_1 = require("../application/use-cases/patient.service");
describe('PatientService', () => {
    let service;
    let mockPatientRepository;
    beforeEach(() => {
        mockPatientRepository = {
            findProfileByUserId: jest.fn(),
            findProfileById: jest.fn(),
            createProfile: jest.fn(),
            updateProfile: jest.fn(),
            createEmergencyContact: jest.fn(),
            updateEmergencyContact: jest.fn(),
            findEmergencyContactByProfileId: jest.fn(),
            createInsurancePolicy: jest.fn(),
            updateInsurancePolicy: jest.fn(),
            findInsurancePolicyByProfileId: jest.fn(),
            createHealthCard: jest.fn(),
            findHealthCardByProfileId: jest.fn(),
            createFamilyConsent: jest.fn(),
            findConsentById: jest.fn(),
            updateConsentStatus: jest.fn(),
            createFamilyMember: jest.fn(),
        };
        service = new patient_service_1.PatientService(mockPatientRepository);
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
                onboardingStep: 1,
            });
            mockPatientRepository.updateProfile.mockResolvedValue({
                id: 'new-profile-uuid',
                firstName: 'John',
                lastName: 'Doe',
                onboardingStep: 2,
            });
            const result = await service.onboardDemographics('user-123', {
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: '1990-01-01',
                gender: 'Male',
            });
            expect(mockPatientRepository.createProfile).toHaveBeenCalled();
            expect(mockPatientRepository.updateProfile).toHaveBeenCalled();
            expect(result.profileId).toBe('new-profile-uuid');
            expect(result.nextStep).toBe(3);
        });
    });
    describe('onboardEmergencyInfo', () => {
        it('should create emergency contact details linked to profile', async () => {
            mockPatientRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123', onboardingStep: 2 });
            mockPatientRepository.findEmergencyContactByProfileId.mockResolvedValue(null);
            mockPatientRepository.createEmergencyContact.mockResolvedValue({ id: 'contact-123' });
            mockPatientRepository.updateProfile.mockResolvedValue({ id: 'profile-123', onboardingStep: 3 });
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
//# sourceMappingURL=patient.service.spec.js.map