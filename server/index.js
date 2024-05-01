const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(cors());
app.listen(9000, () => {
    console.log('Server started at ${9000}')
})

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mongoose = require('mongoose');
const User = require('./UserSchema');
const EnergyDrink = require('./EnergyDrinkSchema')
const Comment = require('./CommentSchema')

const mongoString = "mongodb+srv://thebest418project:9XdoG4auWcIaj6E3@cluster0.v8iw3a6.mongodb.net/"
mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const  database = mongoose.connection

database.on('error', (error)=> console.log(error))
database.once('connected', ()=>console.log('Database Connected'))

app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        console.log(user)
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

// Create Energy Drink endpoint with image upload
app.post('/createEnergyDrink', upload.single('image'), async (req, res) => {
    try {
        let energyDrinkData = req.body;
        if (req.file) {
            // If image is uploaded, set image data and content type
            energyDrinkData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }
        const energyDrink = new EnergyDrink(energyDrinkData);
        energyDrink.upvoteCount = 0;
        await energyDrink.save();
        res.send(energyDrink);
    } catch (error) {
        res.status(500).send(error);
    }
});



app.post('/createComment', async(req,res) => {
    try{
        const comment = new Comment(req.body);
        await comment.save()
        res.send(comment)
    }
    catch(error){
        res.status(500).send(error)
    }
})



// gets a single drink based on its ID
app.get('/drinkPage/:id', async (req, res) => {
    try {
        const energydrink = await EnergyDrink.findById(req.params.id);
        if (!energydrink) {
            return res.status(404).send('Drink not found');
        }
        res.send(energydrink);
    } catch (error) {
        console.log(error)
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

app.get('/getEnergyDrinkImage/:id', async (req, res) => {
    try {
        // Find the energy drink by ID
        const energyDrink = await EnergyDrink.findById(req.params.id);
        if (!energyDrink) {
            return res.status(404).send('Drink not found');
        }

        // Check if the energy drink has an image
        if (!energyDrink.image) {
            return res.status(404).send('Image not found');
        }

        // Set response content type
        res.contentType(energyDrink.image.contentType);

        // Send image data
        res.send(energyDrink.image.data);
    } catch (error) {
        console.error('Error fetching energy drink image:', error);
        res.status(500).send(error);
    }
});



// make sure in the req for this, theres something that stores the id number of the energy drink
app.get('/getCommentsByDrink/:drinkID', async (req, res) => {
    try {
        const comments = await Comment.find({ drinkID: req.params.drinkID });
        res.send(comments);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getAllUsers', async (req, res) => {

    try {
        const user = await User.find()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/drinkCount', async (req, res) => {
    try {
      const count = await EnergyDrink.countDocuments();
      res.send({ count });
    } catch (error) {
      console.error('Error occurred while counting documents:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/userCount', async (req, res) => {
    try {
      const count = await User.countDocuments();
      res.send({ count });
    } catch (error) {
      console.error('Error occurred while counting documents:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/searchDrinks', async (req, res) => {
    const searchQuery = req.query.search;
    try {
        const drinks = await EnergyDrink.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { companyName: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        res.send(drinks);
    } catch (error) {
        console.error('Error searching drinks:', error);
        res.status(500).send(error);
    }
});


app.post('/upvote', async(req,res) => {
    try {
        const energydrink = await EnergyDrink.findById(req.body.id);
        if (!energydrink) {
            return res.status(404).send('Drink not found');
        }
        energydrink.upvoteCount = energydrink.upvoteCount + 1;
        await energydrink.save(); 
        res.send(energydrink); 
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

app.post('/downvote', async(req,res) => {
    try {
        const energydrink = await EnergyDrink.findById(req.body.id);
        if (!energydrink) {
            return res.status(404).send('Drink not found');
        }
        energydrink.upvoteCount = energydrink.upvoteCount - 1;
        await energydrink.save(); 
        res.send(energydrink);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})


app.get('/upvoteCount', async (req, res) => {
    try {
        const energydrink = await EnergyDrink.findById(req.body.id);
        const upvoteCount = energydrink.upvoteCount;
        res.send({ upvoteCount });
    } catch (error) {
        res.status(500).send(error);
    }
  });