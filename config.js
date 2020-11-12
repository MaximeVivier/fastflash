module.exports =  process.env.NODE_ENV === 'production' ? ({
    api: {
      port: process.env.PORT_API
    },
    db: {
      url: process.env.MONGODB_URL
    }
  }) : ({
    api: {
      port: process.env.PORT_API_DEV
    },
    db: {
      url: process.env.MONGODB_URL_DEV
    }
  })
