# Pre-Merge Documentation & Code Review Checklist

- **Document Version**: 1.0
- **Status**: Approved Implementation Baseline
- **Author**: QA Documentation Lead

---

## Review Checklist Guidelines

Before any React pull request is merged into `main`, it must pass all items on this checklist:

### 1. API Synchronization & DTO Alignment
- [ ] Endpoint strictly matches frozen backend API contract (`v1.0.0 RC1`).
- [ ] Input DTO validation schemas use Zod and match backend validation rules.
- [ ] Response DTO types match TypeScript interfaces generated from Swagger.

### 2. UI & Accessibility (WCAG 2.2 AA)
- [ ] All buttons and links have distinct focus rings (`focus-visible:ring-2`).
- [ ] Minimum color contrast ratio `4.5:1` satisfied across light and dark modes.
- [ ] Screen reader ARIA labels (`aria-label`, `aria-describedby`) added to icon-only buttons.

### 3. State Management & Loading/Error States
- [ ] Skeleton loaders rendered during initial data fetch.
- [ ] Empty state component displayed when array is empty.
- [ ] Toast alert and user-friendly error message shown on API failure (no unhandled promise rejections).

### 4. Automated Testing
- [ ] Unit tests pass for custom hooks and complex UI components.
- [ ] Playwright E2E test updated for new user flows.
- [ ] `tsc --noEmit` and `npm run lint` execute with 0 errors.
