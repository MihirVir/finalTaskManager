const express = require('express');
const router = express.Router();
const {login, addUser, authenticateToken, posts} = require('../controllers/user_contoller');
const passport = require('passport');
require('../config/passport')(passport);
const {getAllTask, createTask, updateTask, getTask} = require('../controllers/task_controller');

router.route('/login').post(login);
router.route('/').post(addUser)
router.get('/posts', passport.authenticate('jwt', {session: false}), posts);

router.get('/all', passport.authenticate('jwt', {session: false}), getAllTask)
router.get('/:id', passport.authenticate('jwt', {session: false}), getTask)
router.post('/create', passport.authenticate('jwt', {session: false}), createTask)
router.put('/:id', passport.authenticate('jwt', {session: false}), updateTask)

module.exports = router;