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
          img: 'https://banner2.cleanpng.com/20180417/fbq/kisspng-garnet-steven-universe-ruby-gemstone-lapis-lazuli-steve-borden-5ad6724e455657.576136221524003406284.jpg',
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
          img: 'https://steven-universe.fandom.com/wiki/Ruby?file=RubyRegen2+By+TheOffColors.png',
          species: 'Gem',
          gem_type: 'Ruby',
          weapon: 'Gauntlet',
          age: 'unknown'
        },
        {
          id: 8,
          name: 'Sapphire',
          img: 'https://steven-universe.fandom.com/wiki/Sapphire?file=SappAltExpression2.png',
          species: 'Gem',
          gem_type: 'Sapphire',
          weapon: 'n/a',
          age: 'unknown'
        },
        {
          id: 9,
          name: 'Peridot',
          img: 'https://steven-universe.fandom.com/wiki/Peridot?file=PeridotS6Render+By+TheOffColors.png',
          species: 'Gem',
          gem_type: 'Peridot',
          weapon: 'Limb enhancers',
          age: '~ 3,000'
        },
        {
          id: 10,
          name: 'Lapis Lazuli',
          img: 'https://steven-universe.fandom.com/wiki/Lapis_Lazuli?file=Lapis+S6+By+TheOffColors.png',
          species: 'Gem',
          gem_type: 'Lapis Lazuli',
          weapon: 'Hydrokinesis',
          age: '+ 6,000'
        },
        {
          id: 11,
          name: 'Steven Universe',
          img: 'https://steven-universe.fandom.com/wiki/Steven_Universe_(character)?file=StevenUniverse16+-2-+By+TheOffColors.png',
          species: '50% Gem | 50% Human',
          gem_type: 'Diamond',
          weapon: 'Shield',
          age: '16'
        },
        {
          id: 12,
          name: 'Greg Universe',
          img: 'https://steven-universe.fandom.com/wiki/Greg_Universe?file=Greg+Future.PNG',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'Guitar | Waffle Iron',
          age: '42'
        },
        {
          id: 13,
          name: 'Lars Barriga',
          img: 'https://steven-universe.fandom.com/wiki/Lars_Barriga?file=Lars+Barriga+-Work+Clothes-.png',
          species: 'Human (*)',
          gem_type: 'n/a',
          weapon: 'none',
          age: 'unknown'
        },
        {
          id: 14,
          name: 'Sadie Miller',
          img: 'https://steven-universe.fandom.com/wiki/Sadie_Miller?file=Sadie+Miller.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'none',
          age: '~ 20'
        },
        {
          id: 15,
          name: 'Connie Maheswaran',
          img: 'https://steven-universe.fandom.com/wiki/Connie_Maheswaran?file=Connie+%28SUF2%29.png',
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
