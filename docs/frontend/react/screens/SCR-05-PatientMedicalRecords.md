# Screen SCR-05 Specification — Patient EHR Medical Records Timeline

- **Document Version**: 1.0
- **Status**: Approved Implementation Baseline
- **Author**: Healthcare UX Architect

---

## Screen Overview

- **Screen ID**: `SCR-05`
- **Screen Name**: Patient EHR Medical Records Timeline
- **Route**: `/patient/medical-records`
- **Target Role**: Patient, Dependent
- **Purpose**: Displays chronological clinical encounter history, diagnoses, prescriptions, and downloadable attachments.

---

## API Mapping & Sequence

1. `GET /api/v1/medical-records?patientId={id}` — Fetches encounter list
2. `GET /api/v1/medical-attachments?recordId={id}` — Fetches attached PDFs/scans

---

## UI Components & States

- **Header**: Title "Medical Records", Date Range Filter, Search Bar.
- **Main View**: `MedicalTimeline` rendering chronological `EncounterCard` widgets.
- **Loading State**: Skeleton timeline cards (`SkeletonMedicalCard`).
- **Empty State**: `EmptyState` component displaying "No medical records found".
- **Error State**: Error banner with "Retry" button.
- **Actions**: "Download Attachment" button triggering authenticated file stream.

---

## Accessibility (WCAG 2.2 AA)

- Keyboard tab navigation between timeline cards.
- ARIA expanded states on collapsible encounter details.
