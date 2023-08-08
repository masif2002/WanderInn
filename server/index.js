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
    res.json("Hello World")
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
    res.json(userDoc)

  } catch (err) {
    res.status(422).json(err)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.find({ email })
   

    if (user.length == 0) res.status(404).json({message: "Invalid Credentials" })

    else {
      const passwordMatch = bcrypt.compareSync(password, user[0].password)
      if (!passwordMatch) res.status(401).json({message: "Invalid Credentials"})
    } 

    res.json({message: "Autentication successful"})

  } catch (e) {
    console.log(e);
    res.status(404).json(e)
  }

})

app.listen(5000, () => console.log('Server listening on port 5000...'))