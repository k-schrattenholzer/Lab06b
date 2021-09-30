const client = require('../lib/client');

// import our seed data:
const characterArr = require('./characters.js');
const quotesArr = require('./quotes.js');

const { getEmoji } = require('../lib/emoji.js');
run();

async function run() {

  try {
    await client.connect();

    await Promise.all(
      characterArr.map(character => {
        return client.query(`
                    INSERT INTO characters (name, img, species, gem_type, weapon, age)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
        [character.name, character.img, character.species, character.gem_type, character.weapon, character.age]);
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
