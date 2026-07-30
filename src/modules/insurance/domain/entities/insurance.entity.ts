export class InsurancePolicyEntity {
  id!: string;
  patientProfileId!: string;
  providerName!: string;
  policyNumber!: string;
  coverageDetails!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class InsuranceOcrRecordEntity {
  id!: string;
  patientProfileId!: string;
  imageUrl!: string;
  extractedData!: string; // JSON string payload
  isConfirmed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
