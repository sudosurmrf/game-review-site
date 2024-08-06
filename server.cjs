require('dotenv').config();

const express = require('express');
const client = require('./db/client.cjs');
const app = express();
const  { createUser, getUserInfo }= require('./db/users.cjs');
const { getProducts, getSingleProduct } = require('./db/apireqs.cjs');

app.use(express.json());

client.connect();

app.get('/products', async (req, res, next) => {
  try{
    const products = await getProducts();
    res.json(products);

  }catch(err){
    res.status(500).send('Server Error')
  }
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));