const express = require('express');
const morgan = require('morgan');
const shortid = require('shortid');
const urlreg = require('./helpers');
// Mongo
const mongoose = require('mongoose');
const urlModel = require('./models/schema.js');
const databaseName = 'UrlDB' //from monogoDB
const uri = `mongodb+srv://sarangksk:sarmongodb83@cluster0.oqf6arl.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;
const port = process.env.PORT || 3000;

mongoose.connect(uri)
    .then(result => app.listen(port))
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
    if (urlreg.test(input.urlname)) {
        const entry = new urlModel({ urlPairs: {} });
        const hash = shortid.generate();

        if (!input.urlname.startsWith('http'))
            input.urlname = `http://${input.urlname}`;

        console.log(input.urlname, hash);

        entry.urlPairs.set(hash, input.urlname);
        entry.save()
            .then((result) => {
                const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                res.render('result', {
                    short_url: `${fullUrl}${hash}`, advice
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

app.delete("/:id", (req, res) => {
    const entry = urlModel.deleteOne().exists(`urlPairs.${req.params.id}`)
        .then(result => {
            console.log(result);
            res.status(200).send();
        }).catch(err => {
            console.log(err);
            res.status(400).render('404');
        });
})

// app.delete("/all", (req, res) => {
//     const entry = urlModel.deleteMany().exists(`urlPairs.${}`)
//         .then(result => {
//             console.log(result);
//             res.status(200).send();
//         }).catch(err => {
//             console.log(err);
//             res.status(400).render('404');
//         });
// })