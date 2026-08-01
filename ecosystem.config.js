// Production PM2 Ecosystem Configuration for Health Vault 360 (HVAPI)
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
        PORT: 3073,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      combine_logs: true,
    },
  ],
};
