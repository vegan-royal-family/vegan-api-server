module.exports = {
  port: 3200,
  db: {
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'vegan',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || 'passwd',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  oauth: {
    google: {
      id: process.env.OAUTH_GOOGLE_ID || '',
      secret: process.env.OAUTH_GOOGLE_SECRET || '',
    },
    kakao: {
      id: process.env.OAUTH_KAKAO_ID || '',
    },
    naver: {
      id: process.env.OAUTH_NAVER_ID || '',
      secret: process.env.OAUTH_NAVER_SECRET || '',
    },
    frontCallbackUrl: process.env.OAUTH_FRONT_CALLBACK_URL || '',
  },
  sentry: {
    dsn: 'https://adc6e50d23834a4ebbb35fdaeab18383@o4504560440508416.ingest.sentry.io/4504560465805312',
  },
};
