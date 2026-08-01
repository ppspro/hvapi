# Enterprise Frontend Integration Documentation (EFID) V1.0

- **Document Version**: 1.0.0
- **Status**: Approved Production Baseline
- **Target Audience**: React, Next.js, Flutter Engineers, QA Leads, UI Integration Teams
- **Backend Baseline**: HVAPI Backend v1.0.0 (23 Domain Modules / 299 REST Endpoints)

---

## Overview

Welcome to the **Enterprise Frontend Integration Documentation (EFID) V1.0** repository for Health Vault 360 (HVAPI). This repository provides the comprehensive, client-agnostic integration blueprint defining exactly how React web applications and Flutter mobile applications consume the frozen backend REST APIs.

---

## Directory Structure (`docs/frontend-integration/`)

```
docs/frontend-integration/
├── README.md                              # Master overview & integration blueprint
├── INDEX.md                               # Deep table of contents with cross-links
├── AUTHENTICATION.md                      # JWT Bearer, Login, OTP, 2FA, Token Refresh
├── AUTHORIZATION.md                       # RBAC Roles (PATIENT, DOCTOR, STAFF, ADMIN)
├── SESSION_MANAGEMENT.md                  # Token Storage, Revocation, Session Lifecycle
├── API_CONSUMPTION_MATRIX.md              # 299 REST APIs mapped to UI Integration Specs
├── CACHE_STRATEGY.md                      # TanStack Query / Flutter Cache Policy
├── ERROR_HANDLING.md                      # Global Error Handlers, Toast & Alert Mapping
├── FORM_VALIDATION.md                     # Client-side validation mirroring DTO rules
├── SEARCH_AND_FILTER.md                   # Debounced Search, Filter State, URL Query
├── PAGINATION.md                          # Page/Limit/Skip Pagination Specs
├── FILE_UPLOADS.md                        # Multipart Form Data Upload Protocols
├── FILE_DOWNLOADS.md                      # Binary File Streaming Protocols
├── NOTIFICATIONS.md                       # In-App, Email, SMS & Push Integration
├── OCR_INTEGRATION.md                     # Document Scanner & Confidence Review UI
├── REFERRAL_INTEGRATION.md                # Care Transfer Triage & Referral Workbench UI
├── HEALTH_CARD_INTEGRATION.md             # Digital Health Card & QR Rendering UI
├── FRONTEND_CERTIFICATE.md                # Official Frontend Integration Certificate
└── modules/                               # 23 Module Integration Documents
    ├── Auth.md
    ├── Patient.md
    ├── Doctor.md
    ├── Facility.md
    ├── Staff.md
    ├── Schedule.md
    ├── MedicalRecord.md
    ├── MedicalAttachment.md
    ├── Family.md
    ├── Insurance.md
    ├── Immunisation.md
    ├── HealthCard.md
    ├── QR.md
    ├── Administration.md
    ├── CMS.md
    ├── Reports.md
    ├── Governance.md
    ├── Notifications.md
    ├── OCR.md
    ├── Security.md
    ├── Observability.md
    ├── Referral.md                       # 14 Care Transfer Endpoints UI Specs
    └── AiOcr.md
```

---

## Core Guidelines for Frontend Teams

1. **API Baseline Freeze**: The backend REST API contract is frozen at `v1.0.0` (299 endpoints). Do not create mock APIs or deviate from DTO schemas.
2. **Global Base URL**: All requests target `/api/v1/*` (e.g. `http://localhost:3000/api/v1/auth/login`).
3. **Authentication Header**: Include `Authorization: Bearer <access_token>` on all protected endpoints.
4. **Error Handling**: Handle standard NestJS error payloads (`statusCode`, `message`, `error`).
