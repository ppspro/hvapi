# Referral & Care Coordination Integration Guide

- **Document Version**: 1.0.0
- **Target Component**: `ReferralWorkbench`, `TriageModal`, `ClinicalNoteFeed`
- **Target Screens**: `SCR-19` (Care Referral Workbench)

---

## 1. Overview

The Referral & Care Coordination module enables healthcare providers to coordinate patient transfers, specialist consultations, and emergency handoffs between medical facilities.

---

## 2. Endpoint Integration Specifications (14 Endpoints)

### `POST /api/v1/referrals`
- **Method**: `POST`
- **Auth**: `JWT Bearer`
- **Role**: `DOCTOR`
- **Request Payload**:
  ```json
  {
    "patientId": "patient-uuid-1",
    "receivingFacilityId": "facility-uuid-2",
    "receivingDoctorId": "doctor-uuid-2",
    "referralType": "SPECIALIST_CONSULTATION",
    "priority": "URGENT",
    "reasonForReferral": "Cardiology evaluation needed.",
    "clinicalSummary": "Elevated blood pressure, ECG abnormal.",
    "specialtyRequired": "Cardiology"
  }
  ```
- **Response**: `ReferralResponseDto` (`201 Created`)
- **UI State**: Form submission loading spinner -> Toast notification "Referral created: REF-2026-00001" -> Redirect to `/referrals/REF-2026-00001`.

### `PUT /api/v1/referrals/{id}/triage`
- **Method**: `PUT`
- **Auth**: `JWT Bearer`
- **Role**: `DOCTOR`, `STAFF`
- **Request Payload**:
  ```json
  {
    "outcome": "APPROVED",
    "receivingDoctorId": "doctor-uuid-2",
    "reason": "Accepted for cardiology consultation."
  }
  ```
- **Response**: `ReferralResponseDto` (`200 OK`)
- **UI State**: Triage modal confirm -> Optimistic UI status update to `ACCEPTED` -> Re-fetch notes.
