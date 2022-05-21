const express = require('express')
const router = express.Router();
const {apiThing} = require('../controllers/axiosapi_controller')
router.get('/get', apiThing)
module.exports = router;