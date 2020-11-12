module.exports =  process.env.NODE_ENV === 'production' ? ({
    server: {
      port: process.env.PORT_API
    },
    db: {
      url: process.env.MONGODB_URL
    }
  }) : ({
    server: {
      port: process.env.PORT_API_DEV
    },
    db: {
      url: process.env.MONGODB_URL_DEV
    }
  })
