const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Configured to work with heroku
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//static middleware function

//middleware
//next -> exist so you can tell express when your middleware function is done.
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'We will be back soon.'
//   })
//
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
}); 

//Request-> headers, body, method
//Response-> customize data you sent back, for example
//Express always note if the data is a json type, or html type, etc.
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Luiza, eu te amo!',    
    welcomeMessage: 'Welcome to this website'    
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'    
  });
});

//Heroku port
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});