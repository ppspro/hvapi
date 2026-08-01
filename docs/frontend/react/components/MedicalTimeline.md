# Component Specification — MedicalTimeline

- **Document Version**: 1.0
- **Status**: Approved Implementation Baseline
- **Author**: Design System Architect

---

## Component Overview

- **Component Name**: `MedicalTimeline`
- **Category**: Medical UI Component
- **Description**: Renders a vertical chronological timeline of clinical encounters, diagnostic reports, and medical attachments with interactive collapsible cards.

---

## Props Interface

```typescript
export interface MedicalTimelineProps {
  encounters: EncounterDto[];
  isLoading?: boolean;
  onSelectEncounter?: (id: string) => void;
  onDownloadAttachment?: (attachmentId: string) => void;
}
```

---

## Accessibility & Keyboard Shortcuts

- `Role`: `region` with `aria-label="Medical Encounter History"`.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-sky-600`.
- Arrow Down / Arrow Up keys navigate between encounter cards.
