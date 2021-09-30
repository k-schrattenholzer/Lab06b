const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/', (req, res) => {
  res.json({
    'CurrentRoutes': '{/quotes} {/quotes/id} {/characters} {/characters/id}'
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/characters', async(req, res) => {
  try {
    const data = await client.query('SELECT * from characters');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.post('/characters', async(req, res) => {
  try {
    const data = await client.query(`
    INSERT INTO characters (name, img, species, gem_type, weapon, age)
    VALUES ('${req.body.name}','${req.body.img}','${req.body.species}','${req.body.gem_type},'${req.body.weapon}','${req.body.age}', 1)`);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/characters/:id', async(req, res) => {
  try {
    const data = await client.query('SELECT * from characters where id=$1', [(req.params.id)]);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/quotes', async(req, res) => {
  try {
    const data = await client.query('SELECT * from quotes');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/quotes/:id', async(req, res) => {
  try {
    const data = await client.query('SELECT * from quotes where id=$1', [req.params.id]);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
