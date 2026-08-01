# Referral & Care Coordination Integration Guide

- **Document Version**: 1.0.0
- **Status**: Approved Production Reference
- **Related Module**: `ReferralModule` (`/api/v1/referrals`)

---

## 1. Overview & Business Purpose

The **Enterprise Referral & Care Coordination Platform** enables healthcare providers, specialists, clinics, and hospitals to coordinate inter-facility and intra-facility patient care handoffs, diagnostic referrals, specialist consultations, and emergency transfers.

---

## 2. End-to-End Care Transfer Workflow

```
[Referring Doctor] ──(1) POST /api/v1/referrals ──> [HVAPI Referral Service]
        │                                                     │
        │ (2) Triggers Notification Alert                    │ (Creates REF-2026-XXXXX)
        ▼                                                     ▼
[Receiving Doctor / Facility] <──(3) IN_APP Notification Alert ┘
        │
        │ (4) PUT /api/v1/referrals/{id}/triage (Outcome: APPROVED / DECLINED)
        ▼
[Referral Status Updated: ACCEPTED / REJECTED]
        │
        │ (5) POST /api/v1/referrals/{id}/notes (Add Clinical Coordination Notes)
        ▼
[Status Update: IN_PROGRESS ──> COMPLETED]
```

---

## 3. Key Endpoints & Payload Examples

### Create Care Referral (`POST /api/v1/referrals`)
```json
{
  "patientId": "patient-uuid-1",
  "receivingFacilityId": "facility-uuid-2",
  "receivingDoctorId": "doctor-uuid-2",
  "referralType": "SPECIALIST_CONSULTATION",
  "priority": "URGENT",
  "reasonForReferral": "Patient presents with unresolved cardiology symptoms requiring evaluation.",
  "clinicalSummary": "ECG abnormal, elevated blood pressure.",
  "specialtyRequired": "Cardiology"
}
```

### Triage Referral (`PUT /api/v1/referrals/{id}/triage`)
```json
{
  "outcome": "APPROVED",
  "receivingDoctorId": "doctor-uuid-2",
  "reason": "Accepted for cardiology consultation."
}
```

---

## 4. Integration Notes for Frontend Clients

- **Filters**: List referrals with `patientId`, `status` (`SUBMITTED`, `ACCEPTED`, `COMPLETED`), `priority` (`ROUTINE`, `URGENT`), and `receivingFacilityId`.
- **Status Timeline**: Consume `GET /api/v1/referrals/{id}/history` to render immutable state transition history in UI widgets.
