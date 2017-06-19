const express = require('express')
const router = express.Router()

const sqlController = require('../controllers/sql-controller')

router.get('/table', sqlController.getTables)
router.post('/query', sqlController.executeQuery)

module.exports = router