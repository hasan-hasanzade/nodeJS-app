const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');


const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://hasanzade433:hasanzade433@cluster0.whvdvpw.mongodb.net/';

mongoose
   .connect(db)
   .then((res) => console.log('connected to DB'))
   .catch((error) => console.log(error))

app.listen(PORT, (error) => {
   error ? console.log(error) : console.log(`listenin Port Number ${PORT}`);
})

// MIDDLEWARE ______________________________

// Hand write Logger

// app.use((req, res, next) => {
//    console.log(`path: ${req.path}`)
//    console.log(`path: ${req.method}`)
//    next()
// })

// Morgan Logger

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Middleware для парсинга въодящего запроса

app.use(express.urlencoded({ extended: false }));

// Middleware для разрешения исп статичного файла

app.use(express.static('styles'))

app.use(methodOverride('_method'))

// MIDDLEWARE ______________________________


app.get('/', (req, res) => {
   const title = 'Home';
   res
      .status(200)
      .render(createPath('index'), { title });
})


app.use(postRoutes);
app.use(contactRoutes);


// Redirect 

app.get('/about-us', (req, res) => {
   res.redirect('/contact');
})

app.use((req, res) => {
   const title = 'Error page';
   res
      .status(404)
      .render(createPath('error'), { title })
})

