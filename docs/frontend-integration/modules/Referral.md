# Referral & Care Coordination Integration Blueprint

- **Document Version**: 1.0.0
- **Status**: Approved Integration Specification
- **Module**: `src/modules/referral`

---

## 1. UI Integration Matrix

| UI Component | Action Trigger | Endpoint Invoked | Expected Response | Error Handling |
|---|---|---|---|---|
| `CreateReferralModal` | Form Submit | `POST /api/v1/referrals` | `201 Created` | Toast 400 validation error |
| `ReferralTable` | Component Mount | `GET /api/v1/referrals` | `200 OK` (Paginated) | Empty state table placeholder |
| `TriageActionModal` | Click Approve | `PUT /api/v1/referrals/:id/triage` | `200 OK` | Toast 403 authorization error |
| `ClinicalNoteFeed` | Post Note | `POST /api/v1/referrals/:id/notes` | `201 Created` | Inline field validation error |
| `AttachmentUploader` | File Select | `POST /api/v1/referrals/:id/attachments`| `201 Created` | File size exceed toast error |
| `SlaAnalyticsCard` | Mount | `GET /api/v1/referrals/dashboard/stats` | `200 OK` | Skeleton card fallback |
