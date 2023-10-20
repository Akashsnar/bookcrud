const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path")
const ejs = require('ejs');
// const stripe = require('stripe')('sk_test_51MeWNWSFJfsNtxc8HbcRkFqIAMALQd8W0dZFJJIr9RiaijJJa9W0SnNzp9V5d9klNse1n7ZNpjI2J5HvaCcYnuEq00yUJmTZvo');
// const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const db = require("./mongoSchema/database");
const bookschema = require("./mongoSchema/book");

// const reportschema= require("./mongoSchema/reportschema");
const cookieParser = require('cookie-parser');


// const {config} = require('dotenv');
// config();



app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser());
// app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(session({
//     secret: 'keyboardaksn',
//   resave: false,
//   saveUninitialized: true
// }))


app.get("/", (req, res) => {
    res.render("home")
})
app.get("/addbook", (req, res) => {
    res.render("addbook")
})



app.post('/addbook', async (req, res) => {

    const bookobj = new bookschema();
    bookobj.booktitle = req.body.booktitle;
    bookobj.author = req.body.author;
    bookobj.desc = req.body.desc;
    bookobj.category = req.body.category;
    await bookobj.save();
    res.redirect("/viewbook");
});


app.get("/viewbook", async (req, res) => {
    const books = await bookschema.find();
    res.render("viewbooks", { books })
})

app.get("/updatebook", async (req, res) => {
    const books = await bookschema.find();
    res.render("updatebooks", { books })
})

app.get("/deletebook", async (req, res) => {
    const books = await bookschema.find();
    res.render("deletebook", { books })
})

app.post('/deletebook', async (req, res) => {
    const id = req.body.id;
    try {
        await bookschema.findByIdAndDelete(id);
        res.redirect('/viewbook');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});








app.post("/update", async (req, res) => {
    const id = req.body.id;
    bookschema.findById(id)
        .then(foundObject => {
            if (foundObject) {
                console.log('Found Object:', foundObject.author);
                res.render('updatecard', { book: foundObject });
            } else {
                console.log('Object not found');
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
})

app.post('/updatebook', async (req, res) => {
    console.log('kmf');
    const id = req.body.id;
    const updateData = req.body;

    try {
        const updatedDocument = await bookschema.findByIdAndUpdate(id, updateData, { new: true });

        if (updatedDocument) {
            res.redirect('/viewbook');
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }


});






const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
