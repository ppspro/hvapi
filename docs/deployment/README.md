# Health Vault 360 (HVAPI) — Production Deployment & Infrastructure Manual

- **Production Domain**: `https://360api.vnvision.in`
- **Hosting Management Panel**: `aaPanel`
- **Reverse Proxy**: `Nginx` with `Let's Encrypt SSL/TLS`
- **Process Manager**: `PM2` (Node.js LTS Runtime)
- **Database**: PostgreSQL (`360api` DB, User: `360api`, Port: `5432`)
- **Backend Baseline**: HVAPI Backend v1.0.0 RC1 (23 Domain Modules / 299 REST Endpoints)

---

## Directory Structure (`docs/deployment/`)

```
docs/deployment/
├── README.md                              # Production deployment master guide
├── SERVER_CONFIGURATION.md                # aaPanel, OS limits, firewall & kernel tuning
├── AAPANEL_SETUP.md                       # aaPanel deployment & site setup
├── POSTGRESQL_SETUP.md                    # PostgreSQL 360api database setup & tuning
├── NGINX_CONFIGURATION.md                 # Nginx reverse proxy configuration & security headers
├── PM2_CONFIGURATION.md                   # PM2 ecosystem configuration (`ecosystem.config.js`)
├── SSL_CONFIGURATION.md                   # Let's Encrypt SSL/TLS auto-renewal setup
├── ENVIRONMENT_VARIABLES.md               # Production `.env` environment variables specification
├── DATABASE_DEPLOYMENT.md                 # Prisma migrate deploy & connection pool tuning
├── DEPLOYMENT_CHECKLIST.md                # 20-point production deployment checklist
├── ROLLBACK_PLAN.md                       # Emergency rollback & database restore procedures
├── BACKUP_STRATEGY.md                     # Daily database dumps & backup rotation strategy
├── MONITORING_GUIDE.md                    # Health probes (`/health/live`, `/ready`) & PM2 logs
├── GO_LIVE_CHECKLIST.md                   # Pre-launch production verification checklist
└── PRODUCTION_CERTIFICATE.md              # Official Production Deployment Certificate
```

---

## Quick Reference Links

- [Nginx Reverse Proxy Configuration (NGINX_CONFIGURATION.md)](file:///e:/hvapi/docs/deployment/NGINX_CONFIGURATION.md)
- [PM2 Process Manager Setup (PM2_CONFIGURATION.md)](file:///e:/hvapi/docs/deployment/PM2_CONFIGURATION.md)
- [Environment Variables Specification (ENVIRONMENT_VARIABLES.md)](file:///e:/hvapi/docs/deployment/ENVIRONMENT_VARIABLES.md)
- [Official Production Deployment Certificate (PRODUCTION_CERTIFICATE.md)](file:///e:/hvapi/docs/deployment/PRODUCTION_CERTIFICATE.md)
