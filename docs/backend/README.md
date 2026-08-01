# Health Vault 360 (HVAPI) — Enterprise Backend Developer Documentation

- **Documentation Version**: 1.0.0
- **Status**: Approved Production Reference
- **Backend Baseline**: HVAPI Backend v1.0.0 (23 Modules / 299 REST Endpoints)
- **API Freeze Baseline**: API Contract Frozen (RC1) & Swagger Certified

---

## Overview

Welcome to the **Enterprise Backend Developer Documentation** repository for Health Vault 360 (HVAPI). This repository provides the comprehensive reference for frontend developers (React, Next.js, Flutter), mobile engineers, integration specialists, and system administrators.

---

## Directory Structure

```
docs/backend/
├── README.md                          # Master overview and navigation
├── INDEX.md                           # Master table of contents with hyperlinks
├── ARCHITECTURE.md                    # Clean Architecture, DDD, NestJS & Prisma
├── AUTHENTICATION.md                  # JWT Bearer, Refresh Tokens, 2FA, OTP
├── SECURITY.md                        # KMS Key Rotation, Consent, Audit Logs
├── ERROR_HANDLING.md                  # Standard HTTP errors & exception filters
├── DEPLOYMENT.md                      # Docker, PostgreSQL, environment variables
├── TRACEABILITY_MATRIX.md             # PRD -> API -> Module traceability
├── CERTIFICATE.md                     # Backend Documentation Certificate
├── modules/                           # 23 Module Documentation files
│   ├── Auth.md
│   ├── Patient.md
│   ├── Doctor.md
│   ├── Facility.md
│   ├── Staff.md
│   ├── Schedule.md
│   ├── MedicalRecord.md
│   ├── MedicalAttachment.md
│   ├── Family.md
│   ├── Insurance.md
│   ├── Immunisation.md
│   ├── HealthCard.md
│   ├── QR.md
│   ├── Administration.md
│   ├── CMS.md
│   ├── Reports.md
│   ├── Governance.md
│   ├── Notifications.md
│   ├── OCR.md
│   ├── Security.md
│   ├── Observability.md
│   ├── Referral.md
│   └── AiOcr.md
└── workflows/
    ├── OCRIntegration.md              # OCR & document processing pipeline
    ├── ReferralIntegration.md         # Inter-facility care transfer workflow
    └── NotificationIntegration.md     # Multi-channel notification engine
```

---

## Quick Navigation

- [Master Index (INDEX.md)](file:///e:/hvapi/docs/backend/INDEX.md)
- [Backend Architecture Reference (ARCHITECTURE.md)](file:///e:/hvapi/docs/backend/ARCHITECTURE.md)
- [Authentication Guide (AUTHENTICATION.md)](file:///e:/hvapi/docs/backend/AUTHENTICATION.md)
- [Referral Integration Guide (workflows/ReferralIntegration.md)](file:///e:/hvapi/docs/backend/workflows/ReferralIntegration.md)
- [OCR Integration Guide (workflows/OCRIntegration.md)](file:///e:/hvapi/docs/backend/workflows/OCRIntegration.md)
