# Referral & Care Coordination Module Reference

- **Document Version**: 1.0.0
- **Status**: Approved Production Reference
- **Module Tag**: `Referral & Care Coordination` (`src/modules/referral`)

---

## Purpose & Business Rules

Facilitates patient care transfers between healthcare facilities and specialists. Enforces triage approval (`APPROVED`, `DECLINED`, `MORE_INFO_REQUESTED`, `REDIRECTED`), status progression (`SUBMITTED` -> `TRIAGED` -> `ACCEPTED` -> `IN_PROGRESS` -> `COMPLETED`), clinical notes, document attachment links, and SLA performance metrics.

---

## API Surface (14 Endpoints)

| Method | Route | Description | Auth & Permission |
|---|---|---|---|
| `POST` | `/api/v1/referrals` | Create patient care referral | `JWT + Doctor` |
| `GET` | `/api/v1/referrals` | List referrals with filters | `JWT + Doctor/Staff/Admin` |
| `GET` | `/api/v1/referrals/my-incoming` | List incoming referrals | `JWT + Doctor` |
| `GET` | `/api/v1/referrals/my-outgoing` | List outgoing referrals | `JWT + Doctor` |
| `GET` | `/api/v1/referrals/dashboard/stats` | Get referral SLA analytics | `JWT + Admin/Doctor` |
| `GET` | `/api/v1/referrals/{id}` | Get referral details by ID | `JWT + Authorized` |
| `PUT` | `/api/v1/referrals/{id}/triage` | Triage referral | `JWT + Doctor/Staff` |
| `PUT` | `/api/v1/referrals/{id}/status` | Update referral status | `JWT + Doctor` |
| `POST` | `/api/v1/referrals/{id}/notes` | Add clinical note | `JWT + Doctor/Staff` |
| `GET` | `/api/v1/referrals/{id}/notes` | List clinical notes | `JWT + Authorized` |
| `POST` | `/api/v1/referrals/{id}/attachments` | Link medical attachment | `JWT + Doctor/Staff` |
| `GET` | `/api/v1/referrals/{id}/attachments` | List linked attachments | `JWT + Authorized` |
| `GET` | `/api/v1/referrals/{id}/history` | Get status transition history | `JWT + Authorized` |
| `DELETE` | `/api/v1/referrals/{id}` | Soft-delete referral | `JWT + Admin/Doctor` |
