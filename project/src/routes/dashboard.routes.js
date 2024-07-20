const express = require('express')
const router = express.Router()
const main = require('../controllers/main')
const dashboard = require('../controllers/dashboard')

router.get('/', dashboard.index)


module.exports = router