const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(con => {
    console.log('Database connected:', con.connection.name);
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

const port = 3300;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
