const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);
const {getAllTask, createTask, updateTask, getTask} = require('../controllers/task_controller')

router.get('/', passport.authenticate('jwt', {session: false}), getAllTask);
module.exports = router;