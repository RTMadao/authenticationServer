const express = require('express')
const app = express()

const loginRoutes = require('./login.routes')
const registerRoutes = require('./register.routes')

app.use('/login',loginRoutes);
app.use('/register',registerRoutes);

module.exports = app;