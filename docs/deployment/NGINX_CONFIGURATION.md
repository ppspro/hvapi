# Nginx Production Reverse Proxy Configuration (`https://360api.vnvision.in`)

- **Domain**: `360api.vnvision.in`
- **Backend Upstream**: `127.0.0.1:3000`
- **SSL Certificate**: Let's Encrypt TLS 1.3 / 1.2

---

```nginx
# /www/server/panel/vhost/nginx/360api.vnvision.in.conf

upstream hvapi_backend {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

server {
    listen 80;
    server_name 360api.vnvision.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name 360api.vnvision.in;

    ssl_certificate /www/server/panel/vhost/cert/360api.vnvision.in/fullchain.pem;
    ssl_certificate_key /www/server/panel/vhost/cert/360api.vnvision.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Max File Upload Limit (50MB for Medical Scans & Attachments)
    client_max_body_size 50M;

    location / {
        proxy_pass http://hvapi_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
    }

    # Static Uploads Direct Serve
    location /uploads/ {
        alias /www/wwwroot/360api.vnvision.in/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    access_log /www/wwwlogs/360api.vnvision.in.log;
    error_log /www/wwwlogs/360api.vnvision.in.error.log warn;
}
```
