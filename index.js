const { app, mongoose } = require('./api/app');
const { api, db } = require('./config');

mongoose.connect(db.url,  {useNewUrlParser: true}, { useUnifiedTopology: true } )
mongoose.connection.once('open', () => {
  console.log('Connected to database');
  app.listen(api.port, () => {
    console.log(`NODE_ENV --> ${process.env.NODE_ENV}`);
    console.log(`Now listening for requests on port ${api.port}`);
  });
});