const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.listen(9000, () => {
    console.log('Server started at ${9000}')
})

const mongoose = require('mongoose');
const User = require('./UserSchema');

const mongoString = "mongodb+srv://energize:shashank418@energize.dismtwa.mongodb.net/"
mongoose.connect(mongoString);
const  database = mongoose.connection

database.on('error', (error)=> console.log(error))
database.once('connected', ()=>console.log('Database Connected'))

app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})