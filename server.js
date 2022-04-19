// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


app.get('/get', (req, res) => {
    res.send(projectData)
})

app.post('/add', (req, res) => {
    projectData = {temp: req.body.temperature, date: req.body.date, userResponse: req.body.userResponse}
    res.send(projectData)
})

// Setup Server
app.listen(3000, () => {
    console.log('Server is Running')
})
