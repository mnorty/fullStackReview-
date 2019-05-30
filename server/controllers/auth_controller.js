const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req,res) => {
    const {firstname,lastname,email,username,password} = req.body
    const db = req.app.get('db')
    const {session} = req
    const userFound = await db.check_user_email({email})//passing that in as an object lets us use its name in the sql command
    if (userFound[0]) return res.status(409).send('Email already exists')
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)
    const createdUser = await db.register_user({
      firstname,
      lastname,
      email,
      username,
      password: hash  //if we dont add the : hash it would pull the plain unencrypted password
    })
    session.user = {id: createdUser[0].login_id, username: createdUser[0].username}
    res.status(201).send(session.user)
  },
  login: async (req,res) => {
    const {username, password} = req.body
    const db = req.app.get('db')
    const {session} = req
    const userFound = await db.check_username({username})
    if (!userFound[0]) return res.status(401).send('User does not exist')
    const authenticated = bcrypt.compareSync(password,userFound[0].password)
    if(authenticated){
      session.user = {id: userFound[0].login_id,username: userFound[0].username}
      res.status(200).send(session.user)
    } else {
      return res.status(401).send('Incorrect username or password')
    }
  }
}



// this is what we started with for the tables in the server
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
