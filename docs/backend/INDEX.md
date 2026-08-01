# Master Backend Documentation Index & Table of Contents

- **Documentation Version**: 1.0.0
- **Status**: Approved Production Reference
- **Author**: Enterprise Documentation Board
- **Review Date**: August 1, 2026

---

## Core System Documentation

- [README.md](file:///e:/hvapi/docs/backend/README.md) — Documentation overview & directory structure
- [INDEX.md](file:///e:/hvapi/docs/backend/INDEX.md) — Master table of contents
- [ARCHITECTURE.md](file:///e:/hvapi/docs/backend/ARCHITECTURE.md) — Clean Architecture, DDD, NestJS & Prisma reference
- [AUTHENTICATION.md](file:///e:/hvapi/docs/backend/AUTHENTICATION.md) — JWT Authentication, OTP, 2FA, session lifecycle
- [SECURITY.md](file:///e:/hvapi/docs/backend/SECURITY.md) — Encryption at rest, KMS key rotation, RBAC, consent & audit
- [ERROR_HANDLING.md](file:///e:/hvapi/docs/backend/ERROR_HANDLING.md) — Exception filters & HTTP status code reference
- [DEPLOYMENT.md](file:///e:/hvapi/docs/backend/DEPLOYMENT.md) — Containerization, health probes, PostgreSQL deployment
- [TRACEABILITY_MATRIX.md](file:///e:/hvapi/docs/backend/TRACEABILITY_MATRIX.md) — PRD → API → DB model traceability
- [CERTIFICATE.md](file:///e:/hvapi/docs/backend/CERTIFICATE.md) — Official Backend Documentation Certificate

---

## Module Reference Manual (23 Modules)

1. [Auth Module (modules/Auth.md)](file:///e:/hvapi/docs/backend/modules/Auth.md) — Identity, OAuth, OTP, 2FA, Token Refresh
2. [Patient Module (modules/Patient.md)](file:///e:/hvapi/docs/backend/modules/Patient.md) — 6-Step Onboarding, Profiles, Emergency Contacts
3. [Doctor Module (modules/Doctor.md)](file:///e:/hvapi/docs/backend/modules/Doctor.md) — Doctor Directory, Licenses, Specializations
4. [Facility Module (modules/Facility.md)](file:///e:/hvapi/docs/backend/modules/Facility.md) — Hospitals, Clinics, Wards, Operating Hours
5. [Staff Module (modules/Staff.md)](file:///e:/hvapi/docs/backend/modules/Staff.md) — Nurse & Clerk Roles, Shifts, Workstation
6. [Schedule Infrastructure Module (modules/Schedule.md)](file:///e:/hvapi/docs/backend/modules/Schedule.md) — Doctor Availability Slots & Overrides
7. [Medical Record Module (modules/MedicalRecord.md)](file:///e:/hvapi/docs/backend/modules/MedicalRecord.md) — EHR Encounters, Diagnoses, Clinical Notes
8. [Medical Attachment Module (modules/MedicalAttachment.md)](file:///e:/hvapi/docs/backend/modules/MedicalAttachment.md) — Vault Attachments & Download Streams
9. [Family Module (modules/Family.md)](file:///e:/hvapi/docs/backend/modules/Family.md) — Dependents & Family Consent Management
10. [Insurance Module (modules/Insurance.md)](file:///e:/hvapi/docs/backend/modules/Insurance.md) — Insurance Policies, Claims Drafts, Beneficiaries
11. [Immunisation Module (modules/Immunisation.md)](file:///e:/hvapi/docs/backend/modules/Immunisation.md) — Vaccination Records, Reminders, Certificates
12. [Health Card Module (modules/HealthCard.md)](file:///e:/hvapi/docs/backend/modules/HealthCard.md) — Digital Health Cards & Cryptographic QR
13. [QR Platform Module (modules/QR.md)](file:///e:/hvapi/docs/backend/modules/QR.md) — Dynamic Time-Based Access QR Codes
14. [Administration Module (modules/Administration.md)](file:///e:/hvapi/docs/backend/modules/Administration.md) — User Management, Roles & Governance
15. [CMS Module (modules/CMS.md)](file:///e:/hvapi/docs/backend/modules/CMS.md) — Announcements, Banners, FAQs, Policies
16. [Reports Module (modules/Reports.md)](file:///e:/hvapi/docs/backend/modules/Reports.md) — Dashboards, Analytics & Export Streams (PDF/CSV/XLSX)
17. [Governance Module (modules/Governance.md)](file:///e:/hvapi/docs/backend/modules/Governance.md) — Feature Flags, Master Data, Maintenance Window
18. [Notifications Module (modules/Notifications.md)](file:///e:/hvapi/docs/backend/modules/Notifications.md) — Multi-channel Engine (EMAIL, SMS, PUSH, WEBHOOK)
19. [OCR Platform Module (modules/OCR.md)](file:///e:/hvapi/docs/backend/modules/OCR.md) — CPU-Only Local OCR Engine & Field Review
20. [Security Platform Module (modules/Security.md)](file:///e:/hvapi/docs/backend/modules/Security.md) — KMS Key Rotation, Consent & Audit Logs
21. [Observability Module (modules/Observability.md)](file:///e:/hvapi/docs/backend/modules/Observability.md) — Health Probes (`/health/live`, `/ready`), Metrics, Traces
22. [Referral & Care Coordination Module (modules/Referral.md)](file:///e:/hvapi/docs/backend/modules/Referral.md) — Inter-facility Care Transfers & Triage
23. [AI-OCR Bridge Module (modules/AiOcr.md)](file:///e:/hvapi/docs/backend/modules/AiOcr.md) — Schema Normalizer Bridge

---

## Integration Workflows

- [Referral Integration Workflow (workflows/ReferralIntegration.md)](file:///e:/hvapi/docs/backend/workflows/ReferralIntegration.md)
- [OCR Processing Workflow (workflows/OCRIntegration.md)](file:///e:/hvapi/docs/backend/workflows/OCRIntegration.md)
- [Notification Engine Workflow (workflows/NotificationIntegration.md)](file:///e:/hvapi/docs/backend/workflows/NotificationIntegration.md)
