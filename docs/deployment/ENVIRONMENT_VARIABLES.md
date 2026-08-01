# Production Environment Variables Specification (`.env`)

```env
# Node & Application Environment
NODE_ENV=production
PORT=3000
API_PREFIX=api
API_VERSION=v1
SWAGGER_PATH=docs

# PostgreSQL Production Database
DATABASE_URL="postgresql://360api:P%40ssw0rd360api@127.0.0.1:5432/360api?schema=public&connection_limit=20"

# JWT Security Secrets (Minimum 64 characters)
JWT_SECRET=super_secret_production_jwt_access_token_key_hvapi_360_secure_2026
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=super_secret_production_jwt_refresh_token_key_hvapi_360_secure_2026
JWT_REFRESH_EXPIRATION=7d

# Security & CORS
CORS_ORIGIN=https://360api.vnvision.in,https://app.vnvision.in
BCRYPT_ROUNDS=10

# Storage & Logging
UPLOAD_DIR=/www/wwwroot/360api.vnvision.in/uploads
LOG_LEVEL=info
```
