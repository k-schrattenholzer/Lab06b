require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async () => {
      execSync('npm run setup-db');
  
      await client.connect();
      // const signInData = await fakeRequest(app)
      //   .post('/auth/signup')
      //   .send({
      //     email: 'jon@user.com',
      //     password: '1234'
      //   });
      
      // token = signInData.body.token; // eslint-disable-line
    }, 10000);
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns all characters', async() => {
      const expectation = [
        {
          id: 1,
          name: 'Garnet',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/d/d2/GarnetByKmesLenhi.png',
          species: 'Gem',
          gem_type: 'Fusion',
          weapon: 'Gauntlets',
          age: '~ 5,752'
        },
        {
          id: 2,
          name: 'Stevonnie',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/4/49/Stevonnie_BC.png',
          species: '25% Gem | 75% Human',
          gem_type: 'Diamond',
          weapon: 'Shield',
          age: '~ 28'
        },
        {
          id: 3,
          name: 'Smoky Quartz',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/6/60/Smoky_Quartz_3.png',
          species: '75% Gem | 25% Human',
          gem_type: 'Fusion',
          weapon: 'Yo-yo',
          age: 'unknown'
        },
        {
          id: 4,
          name: 'Rose Quartz',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/f/f9/Rose_Quartz_-_Weaponized.png',
          species: 'Gem',
          gem_type: 'Diamond',
          weapon: 'Shield & Sword',
          age: '+ 6,000'
        },
        {
          id: 5,
          name: 'Pearl',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/8/8c/Current_Pearl_Request.png',
          species: 'Gem',
          gem_type: 'Pearl',
          weapon: 'Spear | Many Swords',
          age: '+ 6,000'
        },
        {
          id: 6,
          name: 'Amethyst',
          img: 'https://steven-universe.fandom.com/wiki/Amethyst?file=Amethyst+CYM+Outfit.png',
          species: 'Gem',
          gem_type: 'Quartz',
          weapon: 'Whip',
          age: 'unknown'
        },
        {
          id: 7,
          name: 'Ruby',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/b/b4/Ruby1_ByTheOffColors.png',
          species: 'Gem',
          gem_type: 'Ruby',
          weapon: 'Gauntlet',
          age: 'unknown'
        },
        {
          id: 8,
          name: 'Sapphire',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/5/5c/SappAltExpression.png',
          species: 'Gem',
          gem_type: 'Sapphire',
          weapon: 'n/a',
          age: 'unknown'
        },
        {
          id: 9,
          name: 'Peridot',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/7/7b/Peridot1_By_TheOffColors.png',
          species: 'Gem',
          gem_type: 'Peridot',
          weapon: 'Limb enhancers',
          age: '~ 3,000'
        },
        {
          id: 10,
          name: 'Lapis Lazuli',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/c/c2/Lapis_S6_By_TheOffColors.png',
          species: 'Gem',
          gem_type: 'Lapis Lazuli',
          weapon: 'Hydrokinesis',
          age: '+ 6,000'
        },
        {
          id: 11,
          name: 'Steven Universe',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/f/f0/Steven_Shield_WD.png',
          species: '50% Gem | 50% Human',
          gem_type: 'Diamond',
          weapon: 'Shield',
          age: '16'
        },
        {
          id: 12,
          name: 'Greg Universe',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/9/92/Greg_PantsCut.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'Guitar | Waffle Iron',
          age: '42'
        },
        {
          id: 13,
          name: 'Lars Barriga',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/4/4d/Lars_Barriga_-Work_Clothes-.png',
          species: 'Human (*)',
          gem_type: 'n/a',
          weapon: 'none',
          age: 'unknown'
        },
        {
          id: 14,
          name: 'Sadie Miller',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/c/cd/Sadie_Miller.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'none',
          age: '~ 20'
        },
        {
          id: 15,
          name: 'Connie Maheswaran',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/5/58/Connie_With_Her_Glasses_On.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'Pearl\'s Sword | Rose\'s Sword | Connie\'s Sword',
          age: '~ 15'
        },
      ];
      const response = await fakeRequest(app).get('/characters');

      expect(response.body).toEqual(expectation);
    });
  });
});
