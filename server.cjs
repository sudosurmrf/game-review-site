require('dotenv').config();

const express = require('express');
const client = require('./db/client.cjs');
const app = express();
const  { createUser, getUserInfo }= require('./db/users.cjs');
const { getProducts, getProductWithReviews } = require('./db/apireqs.cjs');

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

app.get('/products/:product', async(req, res, next) => {
  try{
    const productName = req.params.product;
    const product = await getProductWithReviews(productName);
    if(product) {
      res.json(product);

    }else {
      console.log(err);
      res.status(500).send('Server Error')
    }

  }catch(err){
    res.status(500).send('no page available')
  }
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));