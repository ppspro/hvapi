# PRD to API to React UI Traceability Matrix

- **Document Version**: 1.0
- **Status**: Approved Implementation Baseline
- **Author**: Enterprise Solution Architect & QA Lead

---

## Complete Traceability Mapping

| PRD Module Requirement | Backend Module | Backend API Endpoint | React Portal Route | Key UI Component | Acceptance Criteria |
|---|---|---|---|---|---|
| **PRD-AUTH-01** (JWT Login & 2FA) | `AuthModule` | `POST /api/v1/auth/login` | `/login` | `LoginForm`, `OTPInput` | Validates JWT token, sets refresh cookie, redirects by role |
| **PRD-PAT-01** (6-Step Onboarding) | `PatientModule` | `POST /api/v1/patients/onboard` | `/patient/onboarding` | `MultiStepForm`, `DraftBanner` | Draft saved, complete profile registered cleanly |
| **PRD-MED-01** (EHR Encounters) | `MedicalRecordModule` | `GET /api/v1/medical-records` | `/patient/medical-records` | `MedicalTimeline`, `PDFButton` | Timelines rendered chronologically with attachment previews |
| **PRD-INS-01** (Insurance Claims) | `InsuranceModule` | `GET /api/v1/insurance/policies` | `/patient/insurance` | `InsuranceCard`, `ClaimForm` | Policy details and active claims displayed accurately |
| **PRD-OCR-01** (CPU Document Digitization)| `OCRModule` | `GET /api/v1/ocr/pending` | `/staff/ocr-verify` | `OCRReviewPanel`, `ConfidenceBadge`| Field scores < 0.85 highlighted for nurse verification |
| **PRD-SEC-01** (KMS Key Rotation) | `SecurityModule` | `POST /api/v1/security/keys/rotate`| `/admin/security` | `KMSKeyTable`, `RotateButton` | Key version incremented, audit log created |
| **PRD-OBS-01** (Container Probes) | `ObservabilityModule` | `GET /api/v1/observability/health` | `/admin/observability` | `HealthStatusGrid`, `MetricChart` | Real-time health check probes and system latency displayed |
