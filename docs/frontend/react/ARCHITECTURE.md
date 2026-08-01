# Enterprise React Architecture Specification

- **Document Version**: 1.0
- **Status**: Approved Implementation Baseline
- **Author**: Senior Next.js Architect

---

## Next.js 14+ App Router Architecture

The Health Vault 360 React client apps are structured around the Next.js 14+ App Router paradigm using feature-first modular routing.

### Directory Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── otp/
│   ├── (patient)/
│   │   ├── layout.tsx
│   │   └── patient/
│   │       ├── dashboard/
│   │       └── medical-records/
│   ├── (doctor)/
│   │   └── doctor/
│   └── (admin)/
│       └── admin/
├── components/
│   ├── ui/               # Shadcn primitives (Button, Dialog, Input)
│   ├── medical/          # MedicalTimeline, PatientCard, HealthCardQR
│   └── tables/           # Virtualized DataTable with sorting & pagination
├── hooks/                # Custom React hooks (useAuth, usePatient, useOCR)
├── lib/                  # Axios apiClient, TanStack Query client, utils
├── services/             # Type-safe API service functions
└── types/                # TypeScript interface DTO definitions
```

---

## State Management Strategy

1. **Server State (TanStack Query v5)**:
   - Primary state manager for all backend data.
   - Configured with `staleTime: 5 * 60 * 1000` (5 minutes) and automatic exponential backoff retries.

2. **Client State (Zustand)**:
   - Manages active UI drawer states, theme preferences, and multi-step form drafts (`usePatientDraftStore`).

3. **Authentication State**:
   - `AuthProvider` wrapping application layouts, storing JWT tokens in memory with HttpOnly refresh cookies.
