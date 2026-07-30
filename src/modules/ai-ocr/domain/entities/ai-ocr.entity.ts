export class OcrDocumentEntity {
  id!: string;
  patientProfileId!: string;
  imageUrl!: string;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class OcrExtractionEntity {
  id!: string;
  documentId!: string;
  extractedData!: string;
  confidence!: number;
  createdAt!: Date;
}

export class OcrReviewEntity {
  id!: string;
  documentId!: string;
  correctedData!: string;
  reviewedAt!: Date;
}
