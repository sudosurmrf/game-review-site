const client = require('./client.cjs');

const dropTables = async() => {

  try{
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;`)

  }catch(err){
    console.log('Couldnt drop tables', err)
  }
}

const createReviewTable = async () => {

  try{
    await client.query(`
      CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      product_ID INTEGER REFERENCES products(id),
      CONSTRAINT unique_user_product UNIQUE (username, product_id)
      );`);
  }catch(err) {
    console.log('did not create review table', err)
  }
}

const createUserTable = async () => {

  try{
    await client.query(`
      CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL
      );`);
  }catch(err) {
    console.log('did not create user table', err)
  }
}

const createProductsTable = async () => {

  try{
    await client.query(`
      CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      productname VARCHAR(50) NOT NULL,
      description TEXT
      );`);
  }catch(err) {
    console.log('did not create products table', err)
  }
}

const createTables = async() => {
  await client.connect();
  console.log('connected to db')
  await dropTables();
  console.log('tables dropped!')
  await createUserTable();
  console.log('user table created!')
  await createProductsTable();
  console.log('products table created!')
  await createReviewTable();
  console.log('review table created!')

  
}


const seedUsers = async () => {
  try {
    await client.query(`
      INSERT INTO users (username, password) VALUES
      ('user1', 'password1'),
      ('user2', 'password2'),
      ('user3', 'password3');
    `);
    console.log('Users seeded successfully');
  } catch (err) {
    console.log('Could not seed users', err);
  }
};

const seedProducts = async () => {
  try {
    await client.query(`
      INSERT INTO products (productname, description) VALUES
      ('product1', 'Description for product 1'),
      ('product2', 'Description for product 2'),
      ('product3', 'Description for product 3');
    `);
    console.log('Products seeded successfully');
  } catch (err) {
    console.log('Could not seed products', err);
  }
};

const seedReviews = async () => {
  try {
    await client.query(`
      INSERT INTO reviews (username, content, rating, product_id) VALUES
      ('user1', 'Great product!', 5, 1),
      ('user2', 'Not bad', 3, 1),
      ('user3', 'Could be better', 2, 2),
      ('user1', 'Excellent!', 5, 3);
    `);
    console.log('Reviews seeded successfully');
  } catch (err) {
    console.log('Could not seed reviews', err);
  }
};


const seedTables = async () => {
  
  await seedUsers();
  console.log('seeded the users');
  await seedProducts();
  console.log('seeded the products');
  await seedReviews();
  console.log('seeded the reviews');

  
};

const setupDatabase = async() => {

  await createTables();
  await seedTables();
  await client.end();
  console.log('DB complete')
  
}

setupDatabase();


module.exports = { createUserTable, createProductsTable, createReviewTable }

