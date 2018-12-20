// Modules
var express = require('express')
var app = express()

var bodyParser = require('body-parser')

var https = require('https')
var fs = require('fs')

var mustacheExpress = require('mustache-express')


// Express Engine Config
app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(express.static('public'))


// Express Body Parser Config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Print Station Routes
app.get('/', function(req, res) {
    res.render('printstation/index', {})
})

// Scanner Routes
app.get('/scanner/', function(req, res) {
    res.render('scanner/index', {})
})

app.get('/scanner/bin-count', function(req, res) {
    res.render('scanner/bin-count', {})
})

app.post('/scanner/bin-count', function(req, res) {
    console.log('Bin Count: ' + req.body['bin'])

    res.redirect('/scanner')
})

app.get('/scanner/bin-inquiry', function(req, res) {
    res.render('scanner/bin-inquiry', {})
})

app.post('/scanner/bin-inquiry', function(req, res) {
    console.log('Bin Inquiry: ' + req.body['bin'])

    res.redirect('/scanner')
})

app.get('/scanner/bin-putaway', function(req, res) {
    res.render('scanner/bin-putaway', {})
})

app.post('/scanner/bin-putaway', function(req, res) {
    console.log('Bin Putaway: {"from-bin": "' + req.body['from-bin'] + '" "item": "' + req.body['item'] + '"')

    res.redirect('/scanner')
})


// HTTPS Server Listen
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(3000, function() {
    console.log('Server listening on localhost:3000')
})