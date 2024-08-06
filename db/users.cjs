const client = require('./client.cjs');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const createUser = async(username,password) => {
  try{
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword) //make sure to comment this out before deploy

    await client.query(`
      INSERT INTO users (username, password)
      VALUES ($1, $2);`, [username, encryptedPassword])


  }catch(err){
    console.log('couldnt create user', err)
  }

}


const getUserInfo = async(username, password) => {
  const { rows: [ user ] } = await client.query(`
    SELECT * FROM users
    WHERE username='${username}';`);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(user && passwordMatch) {
      const assignToken = await jwt.sign({userId: user.id }, process.env.JWT_SECRET);

      return assignToken
    } else {
      throw new Error('Either username is invalid or password doesnt match')
    }
}




module.exports = { createUser, getUserInfo }