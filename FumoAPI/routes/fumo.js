const express = require('express')
const router = express.Router()
const Fumo = require('../models/Fumo')

router.route('/')
    // Get all Fumos
    .get(async (req, res) => {
        const fumos = await Fumo.all()

        res.send(fumos);
    })

module.exports = router