const bcrypt = require('bcryptjs');
const client = require('../lib/client');
// import our seed data:
const characters = require('./su_characters.js');
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
      characters.map(character => {
        return client.query(`
                    INSERT INTO su_characters (name, img, species, gem_type, weapon, age, first_appearance, voiced_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                `,
        [character.name, character.img, character.species, character.gem_type, character.weapon, character.age, character.first_appearance, character.voiced_by]);
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
