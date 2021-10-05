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
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
    }, 200000);
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns one character', async() => {
      const expectation = [{
        id: 15,
        character_id: 15,
        character_name: 'Connie Maheswaran',
        img: 'https://static.wikia.nocookie.net/steven-universe/images/5/58/Connie_With_Her_Glasses_On.png',
        species: 'Human',
        gem_type: 'n/a',
        weapon: 'Pearl\'s Sword | Rose\'s Sword | Connie\'s Sword',
        age: '~ 15'
      }]
      ;

      const response = await fakeRequest(app)
        .get('/character-info/15')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(expectation);
    });

    test('returns all quotes', async() => {
      const expectation = [
        {
          id: 1,
          character_name: 'Garnet',
          character_id: 1,
          quote:'Yes... Or, you can link your mind with the energy of all existing matter, channeling the collective power of the universe through your gem! Which results in.. *summons her weapon* At least that\'s my way of doing it.',
        },
        {
          id: 2,
          character_name: 'Garnet',
          character_id: 1,
          quote:'Love at first sight doesn\'t exist. Love takes time and love takes work.',
        },
        {
          id: 3,
          character_name: 'Garnet',
          character_id: 1,
          quote:'You are not two people, and you are not one person. You… are an experience, and make sure you’re a good experience! Now, Go. Have. FUN.'
        },
        {
          id: 4,
          character_name: 'Garnet',
          character_id: 1,
          quote:'Steven: Woah. We made it? Garnet: I carried you while you took a nap.'
        },
        {
          id: 5,
          character_name: 'Stevonnie',
          character_id: 2,
          quote:'I wish you were here. If we were together, it would be okay. But we are together, and it\'s not. I\'m alone.'
        },
        {
          id: 6,
          character_name: 'Stevonnie',
          character_id: 2,
          quote:'You wanna dance? Let\'s go. And it\'s Stevonnie; I am not your baby.'
        },
        {
          id: 7,
          character_name: 'Stevonnie',
          character_id: 2,
          quote:'You have so many worlds and I don\'t even have one! It\'s not fair! I. Want. ONE! I want my own army! I want my own planet! I deserve it! I\'m just as important as you!'
        },
        {
          id: 8,
          character_name: 'Smoky Quartz',
          character_id: 3,
          quote:'Don\'t bother putting your socks back on, \'cause I\'m about to knock \'em off again!'
        },
        {
          id: 9,
          character_name: 'Smoky Quartz',
          character_id: 3,
          quote:'Holy smokes! I\'m Smoky! Steven, you beautiful genius! You pulled Amethyst out of her gem through fusion?!'
        },
        {
          id: 10,
          character_name: 'Smoky Quartz',
          character_id: 3,
          quote:'Well, sometimes you save all the people, but the roller coaster still crashes into the ocean.  (The roller coaster explodes in the water.) And that\'s okay.'
        },
        {
          id: 11,
          character_name: 'Rose Quartz',
          character_id: 4,
          quote:'Isn\'t it remarkable, Steven? This world is full of so many possibilities. Each living thing has an entirely unique experience. The sights they see, the sounds they hear. The lives they live are so complicated... and so simple. I can\'t wait for you to join them.'
        },
        {
          id: 12,
          character_name: 'Rose Quartz',
          character_id: 4,
          quote:'Who cares about how I feel? How you feel is bound to be much more interesting.'
        },
        {
          id: 13,
          character_name: 'Rose Quartz',
          character_id: 4,
          quote:'No more questions. Don\'t ever question this. You already are the answer.'
        },
        {
          id: 14,
          character_name: 'Rose Quartz',
          character_id: 4,
          quote:'When a Gem is made, it\'s for a reason. They burst out of the ground already knowing what they\'re supposed to be, and then... that\'s what they are. Forever. But you, you\'re supposed to change. You\'re never the same even moment to moment -- you\'re allowed and expected to invent who you are. What an incredible power -- the ability to "grow up."'
        },
        {
          id: 15,
          character_name: 'Pearl',
          character_id: 5,
          quote:'Steven, until you learn to control the powers in your gem, *snaps Centipeetle’s neck* we’ll take care of protecting humanity, okay?'
        },
        {
          id: 16,
          character_name: 'Pearl',
          character_id: 5,
          quote:'They don\'t just look like her, they are like her. She made them. I thought I\'d be more ready for this...'
        },
        {
          id: 17,
          character_name: 'Amethyst',
          character_id: 6,
          quote:'In the ring, nobody can tell me what to do! And if they try, I HIT \'EM IN THE FACE WITH A CHAIR!'
        },
        {
          id: 18,
          character_name: 'Amethyst',
          character_id: 6,
          quote:'I only feel how I wanna feel.'
        },
        {
          id: 19,
          character_name: 'Ruby',
          character_id: 7,
          quote:'You\'re not, as above this as you think you are! *groans angrily*'
        },
        {
          id: 20,
          character_name: 'Ruby',
          character_id: 7,
          quote:'Why does she always act like I\'m being ridiculous? Just because she *mumbles underwater*'
        },
        {
          id: 21,
          character_name: 'Sapphire',
          character_id: 8,
          quote:'Ruby: How am I gonna save you? Sapphire: You already did. Ruby: What!? Sapphire: You already saved me.'
        },
        {
          id: 22,
          character_name: 'Sapphire',
          character_id: 8,
          quote:'We won\'t stand out if we play the roles we were made for.'
        },
        {
          id: 23,
          character_name: 'Peridot',
          character_id: 9,
          quote:'You Gems really are as dull as dirt.'
        },
        {
          id: 24,
          character_name: 'Peridot',
          character_id: 9,
          quote:'Steven! You never gave up on me for reasons I don\'t understand! I\'ll do the same for you!'
        },
        {
          id: 25,
          character_name: 'Lapis Lazuli',
          character_id: 10,
          quote:'Can\'t you see? I can\'t stop, not for a second. Don\'t look for me. I don\'t want your help!'
        },
        {
          id: 26,
          character_name: 'Lapis Lazuli',
          character_id: 10,
          quote:'For a moment, I really felt like things were different, but they\'re not. No matter where I go, I\'m trapped.'
        },
        {
          id: 27,
          character_name: 'Steven Universe',
          character_id: 11,
          quote:'Sleep is a curse, and yet a curse I need to live.'
        },
        {
          id: 28,
          character_name: 'Greg Universe',
          character_id: 12,
          quote:'If every pork-chop were perfect, we wouldn\'t have hotdogs.'
        },
        {
          id: 29,
          character_name: 'Lars Barriga',
          character_id: 13,
          quote:'Do you ever get lonely? Even when you\'re around people?'
        },
        {
          id: 30,
          character_name: 'Sadie Miller',
          character_id: 14,
          quote:'Yeah, you know what? Yeah! Who cares, right? What am I afraid of? This could be fun!'
        },
        {
          id: 31,
          character_name: 'Connie Maheswaran',
          character_id: 15,
          quote:'Of course it is. I like you just the way you are.'
        }
      
      ]
      ;

      const response = await fakeRequest(app).get('/quotes');

      expect(response.body).toEqual(expectation);
    });

    test('returns all character-info objects', async() => {
      const expectation = [
        {
          id: 1,
          character_id: 1,
          character_name: 'Garnet',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/d/d2/GarnetByKmesLenhi.png',
          species: 'Gem',
          gem_type: 'Fusion',
          weapon: 'Gauntlets',
          age: '~ 5,752'
        },
        {
          id: 2,
          character_id: 2,
          character_name: 'Stevonnie',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/4/49/Stevonnie_BC.png',
          species: '25% Gem | 75% Human',
          gem_type: 'Diamond',
          weapon: 'Shield',
          age: '~ 28'
        },
        {
          id: 3,
          character_id: 3,
          character_name: 'Smoky Quartz',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/6/60/Smoky_Quartz_3.png',
          species: '75% Gem | 25% Human',
          gem_type: 'Fusion',
          weapon: 'Yo-yo',
          age: 'unknown'
        },
        {
          id: 4,
          character_id: 4,
          character_name: 'Rose Quartz',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/f/f9/Rose_Quartz_-_Weaponized.png',
          species: 'Gem',
          gem_type: 'Diamond',
          weapon: 'Shield & Sword',
          age: '+ 6,000'
        },
        {
          id: 5,
          character_id: 5,
          character_name: 'Pearl',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/8/8c/Current_Pearl_Request.png',
          species: 'Gem',
          gem_type: 'Pearl',
          weapon: 'Spear | Many Swords',
          age: '+ 6,000'
        },
        {
          id: 6,
          character_id: 6,
          character_name: 'Amethyst',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/7/70/Jfek.png',
          species: 'Gem',
          gem_type: 'Quartz',
          weapon: 'Whip',
          age: 'unknown'
        },
        {
          id: 7,
          character_id: 7,
          character_name: 'Ruby',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/b/b4/Ruby1_ByTheOffColors.png',
          species: 'Gem',
          gem_type: 'Ruby',
          weapon: 'Gauntlet',
          age: 'unknown'
        },
        {
          id: 8,
          character_id: 8,
          character_name: 'Sapphire',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/5/5c/SappAltExpression.png',
          species: 'Gem',
          gem_type: 'Sapphire',
          weapon: 'n/a',
          age: 'unknown'
        },
        {
          id: 9,
          character_id: 9,
          character_name: 'Peridot',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/7/7b/Peridot1_By_TheOffColors.png',
          species: 'Gem',
          gem_type: 'Peridot',
          weapon: 'Limb enhancers',
          age: '~ 3,000'
        },
        {
          id: 10,
          character_id: 10,
          character_name: 'Lapis Lazuli',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/c/c2/Lapis_S6_By_TheOffColors.png',
          species: 'Gem',
          gem_type: 'Lapis Lazuli',
          weapon: 'Hydrokinesis',
          age: '+ 6,000'
        },
        {
          id: 11,
          character_id: 11,
          character_name: 'Steven Universe',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/f/f0/Steven_Shield_WD.png',
          species: '50% Gem | 50% Human',
          gem_type: 'Diamond',
          weapon: 'Shield',
          age: '16'
        },
        {
          id: 12,
          character_id: 12,
          character_name: 'Greg Universe',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/9/92/Greg_PantsCut.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'Guitar | Waffle Iron',
          age: '42'
        },
        {
          id: 13,
          character_id: 13,
          character_name: 'Lars Barriga',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/4/4d/Lars_Barriga_-Work_Clothes-.png',
          species: 'Human (*)',
          gem_type: 'n/a',
          weapon: 'none',
          age: 'unknown'
        },
        {
          id: 14,
          character_id: 14,
          character_name: 'Sadie Miller',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/c/cd/Sadie_Miller.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'none',
          age: '~ 20'
        },
        {
          id: 15,
          character_id: 15,
          character_name: 'Connie Maheswaran',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/5/58/Connie_With_Her_Glasses_On.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'Pearl\'s Sword | Rose\'s Sword | Connie\'s Sword',
          age: '~ 15'
        },
        {
          id: 16,
          character_id: 16,
          character_name: 'Spinel',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/4/48/Spinel_By_RylerGamer_-No_Shading-.png',
          species: 'Gem',
          gem_type: 'Spinel',
          weapon: 'Gem Rejuvenator',
          age: '6,000'
        },
        {
          id: 17,
          character_id: 17,
          character_name: 'Bismuth',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/d/da/BismuthMovie.png',
          species: 'Gem',
          gem_type: 'Bismuth',
          weapon: 'Shapeshifting | Breaking Point',
          age: '+ 6,000'
        },
        {
          id: 18,
          character_id: 18,
          character_name: 'Cookie Cat',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/1/1b/Cookie_cat_by_enchantzii-d8pa9mk.png',
          species: 'Cat',
          gem_type: 'n/a',
          weapon: 'Spaceship',
          age: 'ageless'
        },
        {
          id: 19,
          character_id: 19,
          character_name: 'Frybo',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/1/1b/Cookie_cat_by_enchantzii-d8pa9mk.png',
          species: 'Inanimate | Gem(when possessed)',
          gem_type: 'n/a',
          weapon: 'The bits!',
          age: 'ageless'
        },
        {
          id: 20,
          character_id: 20,
          character_name: 'Fluorite',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/8/8f/Fluorite_By_TheOffColors.png',
          species: 'Gem',
          gem_type: 'Fusion',
          weapon: 'none',
          age: 'ageless'
        },
        {
          id: 21,
          character_id: 21,
          character_name: 'Pumpkin',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/3/38/Pumpkin_By_TheOffColors.png',
          species: 'Sentient Pumpkin',
          gem_type: 'n/a',
          weapon: 'none',
          age: 'ageless'
        },
        {
          id: 22,
          character_id: 22,
          character_name: 'Rhodonite',
          img: 'https://static.wikia.nocookie.net/steven-universe/images/3/39/RhodoniteModelSheetPoseByChara.png',
          species: 'Gem',
          gem_type: 'Fusion',
          weapon: 'none',
          age: 'ageless'
        }
      ];
      const response = await fakeRequest(app).get('/character-info');

      expect(response.body).toEqual(expectation);
    });
    
    test('creates a character', async() => {
      const expectation = 
        {
          id: 23,
          img: 'https://static.wikia.nocookie.net/steven-universe/images/4/49/Stevonnie_BC.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'scissors',
          age: '6',
          character_id: 23,
          character_name: 'Sour Cream'
        };

      const sour_cream = 
        {
          img: 'https://static.wikia.nocookie.net/steven-universe/images/4/49/Stevonnie_BC.png',
          species: 'Human',
          gem_type: 'n/a',
          weapon: 'scissors',
          age: '6',
          character_id: 23
        };

      // const data = 
      await fakeRequest(app)
        .post('/character-info')
        .send(sour_cream)
        .expect('Content-Type', /json/)
        .expect(200);

      // expect(data.body).toEqual(expectation);

      const allCharacters = await fakeRequest(app)
        .get('/character-info')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(allCharacters.body).toEqual(expect.arrayContaining([expectation]));
    });

    test('creates a quote', async() => {

      const expectation = 
        {
          id: 32,
          character_id: 23,
          character_name: 'Sour Cream',
          quote:'This is a very profound quote from a beloved character.',
        };

      const new_quote = 
          {
            character_id: 23,
            quote:'This is a very profound quote from a beloved character.',
          };

      // const data = 
      await fakeRequest(app)
        .post('/quotes')
        .send(new_quote)
        .expect('Content-Type', /json/)
        .expect(200);

      // expect(data.body).toEqual(expectation);

      const allQuotes = await fakeRequest(app)
        .get('/quotes')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(allQuotes.body).toEqual(expect.arrayContaining([expectation]));
    });

    test('updates a quote', async() => 
    {

      const expectation = 
          {
            id: expect.any(Number),
            character_id: 1,
            quote:'Love at second sight doesn\'t exist. Love takes time and love takes work.'
          };
    
      const data = await fakeRequest(app)
        .put('/quotes/1')
        .send(
          { 
            character_id: 1,
            quote:'Love at second sight doesn\'t exist. Love takes time and love takes work.'
          })
        .expect('Content-Type', /json/)
        .expect(200); 
    
      expect(data.body).toEqual(expectation);
    });

    test('updates a character', async() => 
    {
      const expectation = 
          {
            id: expect.any(Number),
            img: 'https://static.wikia.nocookie.net/steven-universe/images/6/60/Smoky_Quartz_3.png',
            species: '85% Gem | 75% Human',
            gem_type: 'Who knows?',
            weapon: 'their funny bone',
            age: 'unknown',
            character_id: 23            
          };
    
      const data = await fakeRequest(app)
        .put('/character-info/23')
        .send(
          { 
            img: 'https://static.wikia.nocookie.net/steven-universe/images/6/60/Smoky_Quartz_3.png',
            species: '85% Gem | 75% Human',
            gem_type: 'Who knows?',
            weapon: 'their funny bone',
            age: 'unknown',
            character_id: 23,
          });
    
      expect(data.body).toEqual(expectation);
    });

    // test('deletes a character', async() => 
    // {

    //   const expectation = 
    //       {
    //         id: expect.any(Number),
    //         name: 'Smoky Quartz',
    //         img: 'https://static.wikia.nocookie.net/steven-universe/images/6/60/Smoky_Quartz_3.png',
    //         species: '85% Gem | 75% Human',
    //         gem_type: 'Who knows?',
    //         weapon: 'their funny bone',
    //         age: 'unknown'
    //       };
    
    //   const data = await fakeRequest(app)
    //     .delete('/characters/1')
    //     .expect('Content-Type', /json/)
    //     .expect(200); 
    
    //   expect(data.body).toEqual(expectation);

    //   const allCharacters = await fakeRequest(app)
    //     .get('/characters')
    //     .expect('Content-Type', /json/)
    //     .expect(200); 
      
    //   expect(allCharacters.body).toEqual(expect.not.arrayContaining([expectation]));
    // });

    // test('deletes a quote', async() => 
    // {

    //   const expectation = 
    //       {
    //         id: 2,
    //         character: 'Garnet',
    //         character_id: 1,
    //         quote:'Love at first sight doesn\'t exist. Love takes time and love takes work.'
    //       };
    
    //   const data = await fakeRequest(app)
    //     .delete('/quotes/2')
    //     .expect('Content-Type', /json/)
    //     .expect(200); 
    
    //   expect(data.body).toEqual(expectation);

    //   const allQuotes = await fakeRequest(app)
    //     .get('/quotes')
    //     .expect('Content-Type', /json/)
    //     .expect(200); 
      
    //   expect(allQuotes.body)
    //     .toEqual(expect.not.arrayContaining([expectation]));
    // });
    ///////////// new tests go above ///////////////
  });
});

