export class StaffMemberEntity {
  id!: string;
  userId?: string | null;
  employeeCode!: string;
  fullName!: string;
  gender?: string | null;
  dateOfBirth?: Date | null;
  phone!: string;
  email?: string | null;
  emergencyContact?: string | null;
  profilePhotoUrl?: string | null;
  staffType!: string;
  designation!: string;
  primaryFacilityId!: string;
  secondaryFacilityId?: string | null;
  primaryDepartmentId?: string | null;
  secondaryDepartmentId?: string | null;
  reportingManagerId?: string | null;
  employmentType!: string;
  employmentStatus!: string;
  joiningDate!: Date;
  terminationDate?: Date | null;
  noticePeriodDays!: number;
  biography?: string | null;
  languagesSpoken!: string[];
  verificationStatus!: string;
  verificationNotes?: string | null;
  verifiedBy?: string | null;
  verifiedAt?: Date | null;
  isDeleted!: boolean;
  deletedAt?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;

  qualifications?: StaffQualificationEntity[];
  certifications?: StaffCertificationEntity[];
  experiences?: StaffExperienceEntity[];
  documents?: StaffDocumentEntity[];
}

export class StaffQualificationEntity {
  id!: string;
  staffId!: string;
  degreeName!: string;
  instituteName!: string;
  passingYear!: number;
  fieldOfStudy?: string | null;
  createdAt!: Date;
}

export class StaffCertificationEntity {
  id!: string;
  staffId!: string;
  title!: string;
  issuingAuthority!: string;
  issueDate?: Date | null;
  expiryDate?: Date | null;
  createdAt!: Date;
}

export class StaffExperienceEntity {
  id!: string;
  staffId!: string;
  designation!: string;
  organization!: string;
  startDate!: Date;
  endDate?: Date | null;
  isCurrent!: boolean;
  createdAt!: Date;
}

export class StaffDocumentEntity {
  id!: string;
  staffId!: string;
  documentType!: string;
  medicalAttachmentId?: string | null;
  verificationStatus!: string;
  createdAt!: Date;
}

export class StaffHistoryEntity {
  id!: string;
  staffId!: string;
  action!: string;
  previousStatus?: string | null;
  newStatus!: string;
  reason?: string | null;
  performedBy?: string | null;
  createdAt!: Date;
}

export class StaffAuditLogEntity {
  id!: string;
  staffId!: string;
  action!: string;
  performedBy?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt!: Date;
}
