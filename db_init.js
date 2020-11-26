const { mongoose } = require('./api/app.js');
const Card = require('./api/models/card');
const db_data = require('./db_data.json');
const { exists } = require('./api/models/card');
const { db } = require('./config');

const db_init = () => new Promise( async (res) => {
  mongoose.connect(db.url,  {useNewUrlParser: true}, { useUnifiedTopology: true } )
  mongoose.connection.once('open', async () => {
    console.log('connected to database');
    console.log('Initializing the db by erasing everything then populate it');
    await Card.remove({});
    await Card.insertMany(db_data);
    console.log('data inserted');
    mongoose.connection.close();
    res();
  });
});

module.exports = db_init;
