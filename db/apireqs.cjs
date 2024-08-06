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

const getProductWithReviews = async (product) => {
  try {
    const { rows: productsWithReviews } = await client.query(`
      SELECT p.*, r.id as review_id, r.username, r.content, r.rating
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE p.productname = $1;`, [product]);

    if (productsWithReviews.length === 0) {
      return null;
    }

    const productDetails = {
      id: productsWithReviews[0].id,
      product: productsWithReviews[0].product,
      description: productsWithReviews[0].description,
      reviews: productsWithReviews.filter(review => review.review_id !== null).map(review => ({
        id: review.review_id,
        username: review.username,
        content: review.content,
        rating: review.rating
      }))
    };

    return productDetails;
  } catch (err) {
    console.log('Couldn\'t get product with reviews', err);
    throw err;
  }
};


module.exports = { getProducts, getProductWithReviews }