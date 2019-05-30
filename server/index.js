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

