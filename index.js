const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');
const open = require('sqlite').open;

open({
  filename: './database.sqlite',
  driver: sqlite3.Database
}).then(async db => {



nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.render('index.njk');
});

app.post('/greeting', (req, res) => {
  console.log(req.body.name);
  res.render('greeting.njk', {
    name: req.body.name,
    age: req.body.age
  });
})

app.get('/contact', (req, res) => {
  //console.log(path.resolve(__dirname, 'index.html'));
 res.render('contact.njk');
});


app.get('/page', (req, res) => {
  //console.log(path.resolve(__dirname, 'index.html'));
 res.render('page.njk', {page: req.query.p});
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

app.get('/articles', async (req, res) => {
const articles = await db.all('SELECT * FROM articles;');
console.log(articles);
res.render('articles.njk', {articles});
});

app.get('/articles/new', async (req, res) => {
 
  res.render('newarticle.njk');
  });

app.post('/articles', async (req, res) => {
  await db.run(`INSERT INTO articles (title, body) VALUES ('${req.body.title}', '${req.body.body}');`);
  res.redirect('/articles');
});

app.get('/articles/edit', async (req, res) => {
  const article = await db.get(`SELECT * FROM articles WHERE id=${req.query.id};`);
  res.render('editarticle.njk', {article});
  });
  
 app.post('/articles/edit', async (req, res) => {
    await db.run(`UPDATE articles SET title='${req.body.title}', body='${req.body.body}' 
                  WHERE id=${req.query.id}`);
    res.redirect('/articles');
  });

  app.get('/articles/delete', async (req, res) => {
    await db.run(`DELETE FROM articles
                  WHERE id=${req.query.id}`);
    res.redirect('/articles');
  });


app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
});


});