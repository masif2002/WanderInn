const express = require('express')
const cors = require('cors')
const User = require('./models/User.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const download = require('image-downloader')

require('dotenv').config()

const app = express()

const databaseURL = process.env.MONGO_CONNECTION_URL
const jwtSecret = process.env.JWT_SECRET_KEY
const staticURL = '/photos'

mongoose.connect(databaseURL)

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Sets Access-Control-Allow-Credentials Headers
  }))
  
app.use(cookieParser())

app.use(staticURL, express.static('uploads'))

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
  
  try {

    // Log in credentials
    let { email, password } = req.body

    // Fetch User
    const user = await User.findOne({ email })
    const { name, _id } = user

    if (!user) {
      return res.status(404).json({message: "Invalid Credentials" })
    }
    else {
      const passwordMatch = bcrypt.compareSync(password, user.password)
      if (!passwordMatch) return res.status(401).json({message: "Invalid Credentials"})
    } 

    // Sign JWT Token
    jwt.sign({_id}, jwtSecret, function(err, token) {
      if (err) throw err

      
      return res.cookie('token', token).json({ _id, name, email, message: "Authentication successful"})
    })

    
  } catch (e) {
    // throw err is caught here
    console.log(e);
    res.status(422).json({message: "Something went wrong! Please try again later"})
  }

})

app.get('/profile', async (req, res) => {
  const { token } = req.cookies

  if(token) {
    try {
      const { _id } = jwt.verify(token, jwtSecret)
      const { email, name } = await User.findById(_id)
      
      return res.json({ _id, name, email })
  
    } catch(err) {  
      console.log(err)
      return res.status(422).json({message: "Invalid Token"})
    }
  }

  return res.json(null)

})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json({message: "Logged out"})
})


app.post('/upload-by-link', (req, res) => {
  const { link } = req.body

  download.image({
    url: link,
    dest: __dirname + '/uploads'
  })
  .then(({ filename }) => {
    // Getting only file name instead of full path
    let onlyFileName = filename.split('/uploads')
    onlyFileName = staticURL + onlyFileName[1]

    return res.json({filename: onlyFileName});
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({Error: err})
  })

})



app.listen(5000, () => console.log('Server listening on port 5000...'))