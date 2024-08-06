const client = require('./client.cjs');

const getProducts = async() => {
  try{
    const { rows } = await client.query(`
      SELECT * FROM products;`)

    return rows;

  }catch(err){
    console.log('couldnt grab products', err)
  }

}

const getSingleProduct = async(productName) => {
  try{
    const { rows: products } = await client.query(`
      SELECT * FROM products
      WHERE productname=$1;`,[productName]);

    return products[0]

  }catch(err){
    console.log('couldnt get individual product', err)
  }
}


module.exports = { getProducts, getSingleProduct }