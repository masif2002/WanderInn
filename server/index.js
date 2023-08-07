const express = require('express')
const cors = require('cors')
const User = require('./models/User.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
require('dotenv').config()

const app = express()

const URL = process.env.MONGO_CONNECTION_URL

mongoose.connect(URL)

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Sets Access-Control-Allow-Credentials Headers
  }))
  

app.get('/', (req, res) => {
    return res.json("Hello World")
})

app.post('/register', async (req, res) => {

  const { name, email, password } = req.body

  const hashedPassword = bcrypt.hashSync(password, 10)

  try {
    let userDoc = await User.create({
      name,
      email,
      password: hashedPassword
    });
    return res.json(userDoc)

  } catch (err) {
    return res.status(422).json(err)
  }
    

})

app.listen(5000, () => console.log('Server listening on port 5000...'))