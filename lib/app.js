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
    'CurrentRoutes': '{/quotes} {/quotes/id} {/character-info} {/character-info/id} {/characters}'
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/character-info', async(req, res) => {
  try {
    const data = await client.query(`
      SELECT 
        b.id,
        b.character_id,
        b.img,
        b.species,
        b.gem_type,
        b.weapon,
        b.age,
        c.character_name
      FROM character_info AS b
      JOIN characters AS c
        ON c.id = b.character_id
    `);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/characters', async(req, res) => {
  try {
    const data = await client.query(`
    SELECT 
      id,
      character_name
    FROM characters
    `);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/quotes', async(req, res) => {
  try {
    const data = await client.query(`
    SELECT 
      b.id,
      b.character_id,
      b.quote,
      c.character_name,
      c.img
    FROM quotes AS b
    JOIN characters AS c
      ON c.id = b.character_id
    `);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.post('/quotes', async(req, res) => {
  try {
    const data = await client.query(`
      INSERT INTO quotes (character_id, quote)
      VALUES ($1, $2)
      RETURNING *`,
    [req.body.character_id, req.body.quote]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.post('/character-info', async(req, res) => {
  try {
    const data = await client.query(`
      INSERT INTO character_info (img, species, gem_type, weapon, age, character_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
    [req.body.img, req.body.species, req.body.gem_type, req.body.weapon, req.body.age, req.body.character_id]);
    
    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/character-info/:id', async(req, res) => {
  try {
    const data = await client.query(`
    SELECT 
      b.id,
      b.character_id,
      b.img,
      b.species,
      b.gem_type,
      b.weapon,
      b.age,
      c.character_name
      FROM character_info AS b
      JOIN characters AS c
        ON c.id = b.character_id 
        WHERE b.id=$1`, 
    [(req.params.id)]);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/quotes/:id', async(req, res) => {
  try {
    const data = await client.query(`
    SELECT 
      b.id,
      b.character_id,
      b.quote,
      c.character_name
    FROM quotes AS b
    JOIN characters AS c
      ON c.id = b.character_id
    WHERE b.id=$1`, [req.params.id]);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.delete('/character-info/:id', async(req, res) => {
  try {
    const data = await client.query('DELETE FROM character_info WHERE id=$1 RETURNING *', [(req.params.id)]);
    
    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

app.delete('/quotes/:id', async(req, res) => {
  try {
    const data = await client.query('DELETE FROM quotes WHERE id=$1 RETURNING *', [(req.params.id)]);
    
    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

app.put('/quotes/:id', async(req, res) => {
  try {
    const data = await client.query(
      `UPDATE quotes
      SET character_id=$1, quote=$2
      WHERE id = $3
      RETURNING *;
      `, [req.body.character_id, req.body.quote, req.params.id]);
    
    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

app.put('/character-info/:id', async(req, res) => {
  try {
    const data = await client.query(
      `UPDATE character_info
      SET img=$1, species=$2, gem_type=$3, weapon=$4, age=$5, character_id=$6
      WHERE id=$7
      RETURNING *;
      `, [req.body.img, req.body.species, req.body.gem_type, req.body.weapon, req.body.age, req.body.character_id, req.params.id]);
    
    res.json(data.rows[0]);
  } catch(e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
