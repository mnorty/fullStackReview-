require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      auth_ctrl = require('./controllers/auth_controller')
const app = express()
const {CONNECTION_STRING, SERVER_PORT,SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))

massive(CONNECTION_STRING).then((db) => {
  app.set('db',db) // the 'db' is us choosing the name, and the database is the information, which matches the response from .then above.
  console.log('All your Database are now belong to us')
  app.listen(SERVER_PORT, () => console.log(`listening on port:${SERVER_PORT}`))
})

app.post('/auth/register',auth_ctrl.register)
app.post('/auth/login',auth_ctrl.login)
app.get('/auth/details', auth_ctrl.getDetails)