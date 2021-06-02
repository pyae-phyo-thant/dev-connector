const express = require('express')
const connectDb = require('./config/db')

const app = express()

//connect DB
connectDb()

app.get('/', (req,res) => res.send('API Running'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is live on ${PORT}`))