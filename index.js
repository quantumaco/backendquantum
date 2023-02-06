const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.get('/greeting', (req, res) => {
  console.log(req.query.name);
  res.render('greeting.njk', {
    name: req.query.name,
    age: req.query.age
  });
});


app.get('/contact', (req, res) => {
  //console.log(path.resolve(__dirname, 'index.html'));
 res.render('contact.njk');
});


app.get('/gallery', (req, res) => {
  //console.log(path.resolve(__dirname, 'index.html'));
 res.render('gallery.njk');
});


app.get('/about', (req, res) => {
  //console.log(path.resolve(__dirname, 'index.html'));
 res.render('about.njk');
});

app.get('/values', (req, res) => {
  //console.log(path.resolve(__dirname, 'index.html'));
 res.render('values.njk');
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
});


