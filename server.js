const express = require('express');

// Constants
const PORT = 5008;
const HOST = '0.0.0.0';

const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://test:1234abcd@cluster0.gv0pa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('mongoDB connected...')
}).catch((e) => {
  console.log(e);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);


app.use((error, req, res, next) => {
  res.status(500).json({message: error.message});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;