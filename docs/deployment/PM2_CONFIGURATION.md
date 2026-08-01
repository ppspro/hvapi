# PM2 Process Manager Configuration (`ecosystem.config.js`)

```javascript
module.exports = {
  apps: [
    {
      name: 'hvapi-backend',
      script: './dist/src/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/www/wwwlogs/hvapi-pm2-error.log',
      out_file: '/www/wwwlogs/hvapi-pm2-out.log',
      combine_logs: true,
    },
  ],
};
```
