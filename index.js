const { app, mongoose } = require('./api/app');
const { api, db } = require('./config');

// Connect to db
mongoose.connect(db.url,  {useNewUrlParser: true}, { useUnifiedTopology: true } )
mongoose.connection.once('open', () => {
  console.log('Connected to database');
  // Once the connection to the db is done, launch the server
  app.listen(api.port, () => {
    console.log(`Now listening for requests on port ${api.port}`);
  });
});