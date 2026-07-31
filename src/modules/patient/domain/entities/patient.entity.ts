export class PatientProfileEntity {
  id!: string;
  userId!: string;
  patientNumber!: string | null;
  firstName!: string | null;
  lastName!: string | null;
  dateOfBirth!: Date | null;
  gender!: string | null;
  bloodGroup!: string | null;
  address!: string | null;
  onboardingStep!: number;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class EmergencyContactEntity {
  id!: string;
  patientProfileId!: string;
  name!: string;
  relationship!: string;
  phone!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class FamilyMemberEntity {
  id!: string;
  patientProfileId!: string;
  fullName!: string;
  relationship!: string;
  phone!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class FamilyConsentEntity {
  id!: string;
  patientProfileId!: string;
  inviteePhone!: string;
  relationship!: string;
  status!: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt!: Date;
  updatedAt!: Date;
}
