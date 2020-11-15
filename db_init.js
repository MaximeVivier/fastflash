const { mongoose } = require('./api/app.js');
const Card = require('./api/models/card');
const db_data = require('./db_data.json');
const { exists } = require('./api/models/card');
const { db } = require('./config');

mongoose.connect(db.url,  {useNewUrlParser: true}, { useUnifiedTopology: true } )
mongoose.connection.once('open', async () => {
  console.log('connected to database');
  console.log('Initializing the db by erasing everything then populate it');
  await Card.remove({});
  await Card.insertMany(db_data);
  console.log('data inserted');
  process.exit();

});
