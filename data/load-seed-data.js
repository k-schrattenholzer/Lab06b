const client = require('../lib/client');
const bcrypt = require('bcryptjs');
// import our seed data:
const characterNameArr = require('./characters.js');
const characterInfoArr = require('./character_info.js');
const quotesArr = require('./quotes.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');
run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        const hash = bcrypt.hashSync(user.password, 8);
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, hash]);
      })
    );

    const user = users[0].rows[0];


    await Promise.all(
      characterNameArr.map(character => {
        return client.query(`
                    INSERT INTO characters (character_name)
                    VALUES ($1);
                `,
        [character.character_name]);
      })
    );

    await Promise.all(
      characterInfoArr.map(character => {
        return client.query(`
                    INSERT INTO character_info (img, species, gem_type, weapon, age, character_id)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
        [character.img, character.species, character.gem_type, character.weapon, character.age, character.character_id]);
      })
    );

    await Promise.all(
      quotesArr.map(quote => {
        return client.query(`
                    INSERT INTO quotes (character, character_id, quote)
                    VALUES ($1, $2, $3);
                `,
        [quote.character, quote.character_id, quote.quote]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
