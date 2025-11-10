require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE || 'mongodb://127.0.0.1:27017/formapp';
console.log('Mongo URI:', uri);

// modern connect
mongoose.connect(uri);

mongoose.connection
  .on('open', () => console.log('Mongoose connection open'))
  .on('error', (err) => console.log(`Connection error: ${err.message}`));

require('./models/Registration');

const app = require('./app');

const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

const server = app.listen(PORT, HOST, () => {
  console.log(`Express running at http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} in use`);
  } else {
    console.error(err);
  }
});
