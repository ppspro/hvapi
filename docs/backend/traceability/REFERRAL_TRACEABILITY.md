# Care Transfer & Referral Workflow Traceability

- **Document Version**: 1.0.0
- **Status**: Approved Production Reference
- **Related Module**: `ReferralModule` (`src/modules/referral`)

---

## Referral Workflow Traceability Architecture

```
[PRD Requirement: PRD-REF-01 Care Coordination]
    │
    ▼
[Backend Module: ReferralModule]
    │
    ├── Database Entity: PatientReferral (Prisma Model: patient_referrals)
    ├── Database Entity: ReferralNote (Prisma Model: referral_notes)
    ├── Database Entity: ReferralAttachment (Prisma Model: referral_attachments)
    └── Database Entity: ReferralStatusHistory (Prisma Model: referral_status_histories)
    │
    ▼
[REST API Surface: /api/v1/referrals]
    ├── POST /api/v1/referrals ────────────────> Creates REF-2026-XXXXX care referral
    ├── GET /api/v1/referrals ─────────────────> Lists referrals with pagination & status filters
    ├── PUT /api/v1/referrals/{id}/triage ──────> Triages referral (APPROVED / DECLINED)
    ├── PUT /api/v1/referrals/{id}/status ──────> Progression (IN_PROGRESS -> COMPLETED)
    ├── POST /api/v1/referrals/{id}/notes ──────> Adds clinical coordination notes
    └── GET /api/v1/referrals/{id}/history ─────> Returns immutable state history
    │
    ▼
[OpenAPI / Swagger Tag: Referral & Care Coordination] (docs/swagger-spec.json)
    │
    ▼
[Frontend Target Screen: SCR-19 Care Referral Workbench]
    ├── React Components: ReferralTable, TriageModal, ClinicalNoteFeed
    └── Flutter Mobile: CareTransferView, ReferralCardWidget
```

---

## Compliance & Audit Traceability

- **HIPAA Technical Safeguards**: Patient referrals restrict PHI access to assigned referring and receiving doctors via JWT RBAC ownership verification.
- **PIPEDA Privacy Principles**: Patients can view active care transfer referrals created under their profile (`GET /api/v1/referrals?patientId={id}`).
- **Immutable Audit Logging**: Every status transition generates an entry in `ReferralStatusHistory` and `SecurityPlatformAuditLog`.
