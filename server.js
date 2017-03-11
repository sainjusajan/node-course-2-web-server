var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;

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

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/public/chat.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

// app.listen(port, () =>{
//     console.log('server is running ')
// });
//
