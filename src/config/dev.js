export const config = {
  port: process.env.PORT || 3000,
  backend_url: process.env.BACKEND_URL,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT || 6379,
  secrets: {
    jwt: process.env.JWT_SECRET || 'secret',
    jwtExp: process.env.JWT_EXPIRATION || '180d'
  },
  dataBaseUrl: process.env.DATABASE_URL,
  bcrypt_salt_work_factor: 12,
  mail_server_email_id: process.env.MAIL_SERVER_EMAIL_ID,
  mail_server_password: process.env.MAIL_SERVER_PASSWORD,
  status_chart_route: process.env.STATUS_CHART_ROUTE,
  mail_server: {
    emailId: process.env.MAIL_SERVER_EMAIL_ID,
    password: process.env.MAIL_SERVER_PASSWORD,
    mailTo: [process.env.MAIL_SERVER_EMAIL_ID],
    smtp_service: 'gmail',
    smtp_host: 'smtp.gmail.com'
  },
  razorpay: {
    key: process.env.RZP_KEY,
    secret: process.env.RZP_SECRET
  },
  graylog: {
    host: process.env.GRAYLOG_HOST,
    port: process.env.GRAYLOG_PORT
  }
};
