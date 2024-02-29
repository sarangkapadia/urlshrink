const express = require('express');
const morgan = require('morgan');
const shortid = require('shortid');

// Mongo
const mongoose = require('mongoose');
const urlModel = require('./models/schema.js');
const databaseName = 'UrlDB' //from monogoDB
const uri = `mongodb+srv://sarangksk:sarmongodb83@cluster0.oqf6arl.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
    .then(result => app.listen(3000))
    .catch(err => console.log(err));


// Middleware
const app = express();
app.set('view engine', 'ejs'); // use views, ejs
app.use(morgan('dev')); // logging
app.use(express.urlencoded({ extended: true })); // form data
app.use(express.static('public')); // use public folder

let advice = "";
const populateAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => advice = data.slip.advice)
        .catch(error => console.error(error));
}

// Api handlers
// GET /
app.get("/", (req, res) => {
    res.render('index');
    populateAdvice();
});

// GET /:id
app.get("/:id", (req, res) => {
    console.log("in /:id =", req.params.id);
    const entry = urlModel.findOne().exists(`urlPairs.${req.params.id}`)
        .then(result => {
            const value = result.urlPairs.get(req.params.id);
            console.log("redirecting to ", value);
            res.redirect(value);
        }).catch(err => {
            console.log(err);
            res.status(400).render('404');
        });
});

// POST /
app.post("/", (req, res) => {
    const input = req.body;
    if (URL.canParse(input.urlname)) {
        const entry = new urlModel({ urlPairs: {} });
        const hash = shortid.generate();
        console.log(input.urlname, hash);
        entry.urlPairs.set(hash, input.urlname);
        entry.save()
            .then((result) => {
                res.render('result', {
                    short_url: `http://localhost:3000/${hash}`, advice
                });
            })
            .catch(err => {
                console.log(err);
            })
    } else
        res.render('result', {
            short_url: "Invalid URL!", advice
        });

    populateAdvice();
});

