const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`

                CREATE TABLE users (
                  id SERIAL PRIMARY KEY,
                  email VARCHAR(256) NOT NULL,
                  hash VARCHAR(512) NOT NULL
                ); 

                CREATE TABLE characters (
                    id SERIAL PRIMARY KEY NOT NULL,
                    character_name VARCHAR(512) NOT NULL
                );

                CREATE TABLE quotes (
                    id SERIAL PRIMARY KEY,
                    character VARCHAR(512) NOT NULL,
                    character_id INTEGER NOT NULL,
                    quote VARCHAR(512) NOT NULL
                );

                CREATE TABLE character_info (
                  id SERIAL PRIMARY KEY NOT NULL,
                  character_id INTEGER NOT NULL REFERENCES characters(id),
                  img VARCHAR(512) NOT NULL,
                  species VARCHAR(512) NOT NULL,
                  gem_type VARCHAR(512) NOT NULL,
                  weapon VARCHAR(512) NOT NULL,
                  age VARCHAR(512) NOT NULL
              );`);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
