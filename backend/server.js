import { config } from 'dotenv';
import { connect } from 'mongoose';

config({ path: './.env' });

import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

connect(DB)
  .then((con) => {
    console.log('Database connected:', con.connection.name);
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

const port = 3300;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
