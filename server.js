const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error registering new user.');
        } else {
            res.status(200).send('User registered successfully!');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
