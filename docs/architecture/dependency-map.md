# Health Vault 360 (HVAPI) — Enterprise Module Dependency & Domain Interaction Policy

**Project:** Health Vault 360 (HVAPI)  
**Document Status:** Approved Architecture Standard  

---

## 1. Allowed Module Dependencies Matrix

| Downstream Module | Allowed Inbound Dependencies | Rationale |
| :--- | :--- | :--- |
| **AuthModule** | None (Base Identity Provider) | Base authentication & session isolation. |
| **PatientModule** | `AuthModule` | Demographic records depend on authenticated identity. |
| **DoctorModule** | `AuthModule`, `FacilityModule` | Professional credentials link to hospital facilities. |
| **FacilityModule**| `AuthModule` | Hospital directory and department hierarchy. |
| **HealthCardModule**| `PatientModule` | Health card issuing strictly links to patient profile. |
| **AppointmentModule**| `PatientModule`, `DoctorModule`, `FacilityModule` | Scheduling requires patient, doctor, and location context. |
| **ReportModule** | `PatientModule`, `DoctorModule` | Medical lab reports require patient & prescribing doctor. |
| **InsuranceModule**| `PatientModule` | Policy linking requires verified patient profile. |
| **CmsModule** | None (Public Domain) | Content and FAQs are publicly read-accessible. |
| **AdminModule** | `DatabaseModule`, `PinoLoggerModule` | Audit logging reads read-only database views. |

---

## 2. Forbidden Cross-Domain Interactions & Rules

1. **Forbidden Direct Database Cross-Joins:** No table owned by `PatientModule` may be directly joined in SQL/ORM queries executed by `DoctorModule`.
2. **Forbidden Circular Dependencies:** `forwardRef()` is strictly prohibited across NestJS `@Module()` declarations.
3. **Domain Event Isolation:** Inter-module notifications must execute via Application Interface Services or Domain Event listeners.
