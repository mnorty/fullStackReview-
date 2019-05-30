const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req,res) => {
    const {firstname,lastname,email,username,password} = req.body
    const db = req.app.get('db')
    const {session} = req
    const userFound = await db.check_user_email({email})//passing that in as an object lets us use its name in the sql command
  }
}



//this is what we started with for the tables in the server
// create table balances (
//   balance_id serial primary key,
//   balance integer
// );

// create table user_login (
//   login_id serial primary key,
//   username varchar(50),
//   password text
// );

// create table users (
//   user_id serial primary key,
//   firstname varchar(50),
//   lastname varchar(50),
//   email varchar(50)
// );
