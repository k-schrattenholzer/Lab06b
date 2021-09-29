const client = require('../lib/client');
// import our seed data:
const characterArr = require('./su_characters.js');

const { getEmoji } = require('../lib/emoji.js');
run();

async function run() {

  try {
    await client.connect();


    await Promise.all(
      characterArr.map(character => {
        return client.query(`
                    INSERT INTO su_characters (name, img, species, gem_type, weapon, age)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                `,
        [character.name, character.img, character.species, character.gem_type, character.weapon, character.age]);
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
