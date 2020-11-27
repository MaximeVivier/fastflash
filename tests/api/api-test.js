const supertest = require("supertest");
const { app, mongoose } = require('./../../api/app');
const { api, db } = require('../../config');
const db_init = require('../../db_init');

// Building test with this data is importnant because that's the data we populate the database with.
// Let's compare directly with it and not static strings, because if this file changes,
//  tests won't be accurate anymore even if the feature works well.
const data_for_test = require('../../db_data.json');

let server;
const all_fields_return_from_graphql = 'id\nrecto\nverso\nrecto_def\nverso_def\nposition\nlibrary '

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

describe('Test all graphql routes', () => {
  beforeAll(async () => {
    await db_init();
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

  test('graphql all_cards', async (done) => {
    // Sends GET Request to /test endpoint
    const { body: { data: { all_cards } } } = await request.post('/graphql')
      .send({
        query: `{all_cards { ${all_fields_return_from_graphql} } }`
      });

    // Order is important here otherwise the tests won't pass, but actually we don't mind the order that's why we sort.
    expect(all_cards.sort((a,b) => a.id - b.id)).toEqual(data_for_test.sort((a,b) => a.id - b.id));

    done();
  });

  test('graphql card', async (done) => {
    const id_of_the_card_to_fetch = 1;
    const data_for_fetch_card_test = data_for_test.find(el => el.id === id_of_the_card_to_fetch);

    const { body: { data: { card } } } = await request.post('/graphql')
      .send({
        query: `{card(id:${id_of_the_card_to_fetch}) { ${all_fields_return_from_graphql} } }`
      });
    
    expect(card).toEqual(data_for_fetch_card_test)

    done();
  });

  test('graphql addCard', async (done) => {
    const card_to_add_for_the_test = {
      id: 10,
      library: "french/english",
      recto_def: "french",
      verso_def: "english",
      recto: "fourmi",
      verso: "ant",
      position: true
    };
    
    // When you want to change something about this test data, you only have to do it in the previous object
    const str_card_to_add_for_the_test_query = `mutation{
      addCard(
        id:${card_to_add_for_the_test.id},
        library:\"${card_to_add_for_the_test.library}\",
        recto_def:\"${card_to_add_for_the_test.recto_def}\",
        verso_def:\"${card_to_add_for_the_test.verso_def}\",
        recto:\"${card_to_add_for_the_test.recto}\",
        verso:\"${card_to_add_for_the_test.verso}\",
        position:${card_to_add_for_the_test.position}) { 
          ${all_fields_return_from_graphql}
        } }`;

    const { body: { data: { addCard } } } = await request.post('/graphql')
      .send({
        query: str_card_to_add_for_the_test_query
      });

    expect(addCard).toEqual(card_to_add_for_the_test);

    done();
  });

  test('graphql flipCard', async (done) => {
    const id_of_the_card_to_flip = 1;

    const data_for_flip_card_test = data_for_test.find(el => el.id === id_of_the_card_to_flip);

    const str_card_to_flip_query = `mutation{flipCard(id:${data_for_flip_card_test.id},position:${data_for_flip_card_test.position}) {id} }`;

    await request.post('/graphql')
      .send({
        query: str_card_to_flip_query
      });

    const { body: { data: { card } } } = await request.post('/graphql')
      .send({
        query: `{card(id:${id_of_the_card_to_flip}) { ${all_fields_return_from_graphql} } }`
      });

    expect(card).toEqual({ ...data_for_flip_card_test , position: !data_for_flip_card_test.position });

    done();
  });

  test('graphql cards_of_lib', async (done) => {
    // Be sure of the fields we ask grphql to match the data expected
    const library_to_test = 'frances/espanol';

    let { body: { data: { cards_of_lib } } } = await request.post('/graphql')
      .send({
        query: `{cards_of_lib(library:"${library_to_test}") { ${all_fields_return_from_graphql} } }`
      });

      const data_for_cards_of_lib_test = data_for_test
        .filter(el => el.library === 'frances/espanol')
        .sort((a,b) => a.id - b.id);
      
      cards_of_lib = cards_of_lib.sort((a,b) => a.id - b.id);

      expect(cards_of_lib).toEqual(data_for_cards_of_lib_test);

      done();
  });

});