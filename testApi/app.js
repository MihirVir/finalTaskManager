
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const passport = require('passport');
const userRoutes = require('./routes/user');
const helmet = require('helmet')
require('dotenv').config();
const apis = require('./routes/api')
//middle ware

app.use(express.json());

const port = 8000;

app.use(helmet())
app.use(passport.initialize());
require('./config/passport');

// app.use('/', tasks);
app.use('/user', userRoutes);
app.use('/api', apis)
//starting the server when the database is connected
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}..`));
    } catch (err) {
        console.log(err);
    }
}
start()