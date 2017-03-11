var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method } ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});
app.use( (req, res, next) => {
    res.render('maintainance.hbs');
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        pageContent: 'WElcome to HomePage',
        currentYear: new Date().getFullYear()
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});



app.get('/bad', (req, res) =>{
    res.send({
        errorMessage : 'hey you cant do that '
    })
})


app.listen(3000);

