const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Obligatoire pour Render.com ou Heroku
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
