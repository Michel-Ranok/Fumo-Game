// Librairie
const express = require('express')
const logger = require('morgan')
const cors = require('cors');

// Création de l'app
const app = express()

// Plugins
app.use(logger('dev'))

// Body Parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

// Route racine
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routers
app.use('/fumo', require('./routes/fumo'))

module.exports = app