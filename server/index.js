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
const EnergyDrink = require('./EnergyDrinkSchema')
const Tag = require('./TagSchema')
const Comment = require('./CommentSchema')

const mongoString = "mongodb+srv://thebest418project:9XdoG4auWcIaj6E3@cluster0.v8iw3a6.mongodb.net/"
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

app.post('/createEnergyDrink', async(req,res) => {
    try{
        const energyDrink = new EnergyDrink(req.body);
        await energyDrink.save()
        res.send(energyDrink)
    }
    catch(error){
        res.status(500).send(error)
    }
})


app.post('/createTag', async(req,res) => {
    try{
        const tag = new Tag(req.body);
        await tag.save()
        res.send(tag)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/createComment', async(req,res) => {
    try{
        const tag = new Tag(req.body);
        await tag.save()
        res.send(tag)
    }
    catch(error){
        res.status(500).send(error)
    }
})



app.get('/getTags', async (req, res) => {
    try {
        const tagList = await Tag.find({}, {name:1});
        res.send(tagList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

// gets a single drink based on its ID
app.get('/drinks/:id', async (req, res) => {
    try {
        const energydrink = await EnergyDrink.findById(req.params.id);
        if (!energydrink) {
            return res.status(404).send('Drink not found');
        }
        res.send(energydrink);
    } catch (error) {
        res.status(500).send(error);
    }
})

// gets all drinks
app.get('/getAlldrinks', async (req, res) => {
    try {
        const energyDrinks = await EnergyDrink.find({});
        res.send(energyDrinks);
    } catch (error) {
        res.status(500).send(error);
    }
})

// make sure in the req for this, theres something that stores the id number of the energy drink
app.get('/getCommentsByID', async (req,res) => {
    try{
        const comments = await Comment.find({drinkID: req.body.id});
        res.send(comments);
    }
    catch(error){
        res.status(500).send(error);
    }
})