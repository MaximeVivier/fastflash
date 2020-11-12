const supertest = require("supertest");
const { app, mongoose } = require('./../../api/app');
const { api, db } = require('../../config');

let server;

const start = async () => new Promise((res) => {
  mongoose.connect(db.url,  {useNewUrlParser: true}, { useUnifiedTopology: true } )
  mongoose.connection.once('open', () => {
    console.log('Connected to database');
    server = app.listen(api.port, () => {
      console.log(`NODE_ENV --> ${process.env.NODE_ENV}`);
      console.log(`Now listening for requests on port ${api.port}`);
      res();
    });
  });
});

describe('get /ping request', () => {
  beforeAll(async () => {
    await start();
    request = supertest(app);
  });

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    server.close();
    done();
  })

  test('pong', async (done) => {
    // Sends GET Request to /test endpoint
    const resp = await request.get('/ping');

    expect(resp.text).toBe("pong");

    done();
  });

  test('graphql cards', async (done) => {
    // Sends GET Request to /test endpoint
    const resp = await request.post('/graphql')
      .send({
        query: "{cards { id } }"
      });

    expect(resp.text).toBe("{\"data\":{\"cards\":[{\"id\":1},{\"id\":3},{\"id\":2},{\"id\":4},{\"id\":5},{\"id\":6},{\"id\":7},{\"id\":8},{\"id\":9}]}}");

    done();
  });

  test('graphql card', async (done) => {
    const resp = await request.post('/graphql')
      .send({
        query: "{card(id:1) { id } }"
      });

      expect(resp.text).toBe("{\"data\":{\"card\":{\"id\":1}}}")

      done();
  });

  test('graphql addCard', async (done) => {
    const resp = await request.post('/graphql')
      .send({
        query: "mutation{addCard(id:10,library:\"french/english\",recto_def:\"english\",verso_def:\"french\",recto:\"ant\",verso:\"fourmi\",position:true) { id\nrecto\nverso } }"
      });

      expect(resp.text).toBe("{\"data\":{\"addCard\":{\"id\":10,\"recto\":\"ant\",\"verso\":\"fourmi\"}}}")

      done();
  });

  test('graphql flipCard', async (done) => {
    const resp = await request.post('/graphql')
      .send({
        query: "mutation{flipCard(id:1,position:true) {id} }"
      });

    const resp2 = await request.post('/graphql')
      .send({
        query: "{card(id:1) { id\nposition } }"
      });

      expect(resp2.text).toBe("{\"data\":{\"card\":{\"id\":1,\"position\":false}}}")

      done();
  });

});