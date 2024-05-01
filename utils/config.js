const { version } = require('../package.json')
const VERSION = 'V' + version
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://dev:Vm0p67n9M0Z9j0jx@cluster0.cfrfrnu.mongodb.net/?retryWrites=true&w=majority'

// Rate limiter
const limiterTemplate = {
  windowMs: 0,
  max: 0,
  message: '401: Too many requests.',
  standardHeaders: true,
  legacyHeaders: false
}

const config = {
  development: {
    port: process.env.SERVER_PORT || 3000,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 0,
      max: process.env.RATE_LIMIT_MAX || 1500
    },
    cache_interval: process.env.CACHE_INTERVAL * 60 * 1000 || 10 * 1000,
    secret: 'jLJhDQMYtXjCwQmu',
    smtp_host: process.env.SMTP_HOST || 'http://localhost:30000/mail/send',
    admin_email: process.env.ADMIN_EMAIL,
    captcha_secret: '1x0000000000000000000000000000000AA'
  },
  staging: {
    port: process.env.SERVER_PORT || 3001,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 300000,
      max: process.env.RATE_LIMIT_MAX || 100
    },
    cache_interval: process.env.CACHE_INTERVAL * 60 * 1000 || 15 * 60 * 1000,
    secret: process.env.SECRET,
    smtp_host: process.env.SMTP_HOST || 'http://localhost:30000/mail/send',
    admin_email: process.env.ADMIN_EMAIL,
    captcha_secret: process.env.CAPTCHA_SECRET
  },
  production: {
    port: process.env.SERVER_PORT || 3002,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 300000,
      max: process.env.RATE_LIMIT_MAX || 100
    },
    cache_interval: process.env.CACHE_INTERVAL * 60 * 1000 || 15 * 60 * 1000,
    secret: process.env.SECRET,
    smtp_host: process.env.SMTP_HOST,
    admin_email: process.env.ADMIN_EMAIL,
    captcha_secret: process.env.CAPTCHA_SECRET
  }
}

module.exports = config[NODE_ENV]
module.exports.ENV = NODE_ENV
module.exports.MONGO_URI = MONGO_URI
module.exports.VERSION = VERSION
