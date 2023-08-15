const express = require('express')
const cors = require('cors')
const User = require('./models/User.js')
const Accomodation = require('./models/Accomodation.js')
const Booking = require('./models/Booking.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const download = require('image-downloader')
const multer = require('multer')
const fs = require('fs')

require('dotenv').config()

const app = express()
const photosMiddleware = multer({dest: 'uploads/'})

const databaseURL = process.env.MONGO_CONNECTION_URL
const jwtSecret = process.env.JWT_SECRET_KEY

mongoose.connect(databaseURL)

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Sets Access-Control-Allow-Credentials Headers
  }))
  
app.use(cookieParser())

app.use('/photos', express.static('uploads'))


function processJWT(token) {
  return new Promise((resolve, reject) => {
 
     if (!token) reject({ message: "Must be authenticated" })
 
 
     jwt.verify(token, jwtSecret, (err, userInfo) => {
       
       if (err) reject({ message: "Invalid Token" })
 
       resolve(userInfo._id)
 
     })
 
  })
 
 }
 
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
    let onlyFileName = filename.split('/uploads/')

    // Renaming file
    let newFileName =  'uploads/' +  Date.now() + onlyFileName[1]
    fs.renameSync(filename, newFileName)


    return res.json({filename: newFileName.replace('uploads', 'photos')});
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({Error: err})
  })

})

app.post('/upload-photos', photosMiddleware.array('files[]'), (req, res) => {
  // Job of the middleware function used is to download photos

  // Getting files from request (req.files) | Not a middleware operation
  const { files } = req
  const uploadedURL = []

  // Renaming Files and sending the path to files
  files.forEach(({path, originalname}) => {
    let newFileName = Date.now() + originalname
    fs.renameSync(path, `uploads/${newFileName}`)

    let URL = '/photos/' + newFileName
    uploadedURL.push(URL)
  })
  
  res.status(200).json(uploadedURL)
})

// List of all places from an owner
app.get('/myplace', async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({message: "Please log in!"})
  
  let id;

  try {
    const {_id} = jwt.verify(token, jwtSecret)
    id = _id
  } catch (err) {
    console.log(err)
    return res.status(422).json({message: "Invalid Token"})
  }

  const places = await Accomodation.find({ owner: id })

  return res.json(places)


})

app.post('/place', (req, res) => {
  const { title, description, address, photos, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body

  const { token } = req.cookies
  if (!token) return res.status(401).json({message: "Please log in!"})
  
  try {
    var { _id } = jwt.verify(token, jwtSecret)
  }
  catch(err) {  
    console.log(err)
    return res.status(422).json({message: "Invalid Token"})
  }

  const newPlace = new Accomodation({
    owner:_id, title, description, address, photos, perks, extraInfo, checkIn, checkOut, maxGuests, price
  })

  newPlace.save()
  .then((placeDoc) => res.json(placeDoc)) 
  .catch((err) => {
    console.log(err)
    res.status(500).json({message: "Something went wrong!"})
  })
})

app.put('/place', async (req, res) => {
  const { id, title, description, address, photos, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body

  // Verify Token here 
  await Accomodation.findByIdAndUpdate(
    id, 
    { title, description, address, photos, perks, extraInfo, checkIn, checkOut, maxGuests, price}
  )

  res.json({message: 'Doc updated'})
})


app.get('/place/:id', async (req, res) => {
  const { id } = req.params
  // Verify token logic goes here

  const placeDoc = await Accomodation.findById(id)
  return res.json({ placeDoc })

})

// List of all places
app.get('/places', (req, res) => {

  Accomodation.find({})
    .then((placesList) => {
      return res.json({ placesList })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({message: "Oops! Something went wrong!"})
    })

})





app.post('/booking', (req, res) => {
  const details = req.body
  const { token } = req.cookies

  processJWT(token)
    .then((userId) => {

      Booking.create({
        userId, ...details
      })
        .then(() => res.json({message: "Booking successful"}))
        .catch(() => {
          res.status(422).json({message: "Boooking failed"})
        })

    })

    .catch((err) => 
      res.status(401).json(err)
    )

})

app.get('/bookings', (req, res) => {
  const { token } = req.cookies

  processJWT(token)
    .then((userId) => {
      Booking.find({ userId }).populate('placeId')
        .then((bookings) => {
          res.json({bookings})
        })
    
    })
    .catch((err) => 
      res.status(401).json(err)
    )
})


app.listen(5000, () => console.log('Server listening on port 5000...'))