const express = require('express')
const cors = require('cors')

const app = express()


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Sets Access-Control-Allow-Credentials Headers
  }))

  

app.get('/', (req, res) => {
    return res.json("Hello World")
})

app.listen(5000)