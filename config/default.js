module.exports = {
  port: 3200,
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || 'passwd',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  sentry: {
    dsn: 'https://adc6e50d23834a4ebbb35fdaeab18383@o4504560440508416.ingest.sentry.io/4504560465805312',
  },
};
