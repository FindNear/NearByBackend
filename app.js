const { json } = require('express');
const express = require('express');

const app = express(json);
const apiKey = "AIzaSyCGngGGClD4hATm3ZfMN4gW9tW0QtyJ_OQ"
const port = process.env.PORT || 3000

var axios = require('axios');

//Speeds in m/s
var speeds = {
    "walk": 1.4
}

app.get('/', (req, res) => {
  res.send("Welcome to NearBy");
});

app.get('/:lat/:long/:mode/:time', (req,res) => {
    var location = req.params.lat + "%2C" + req.params.long
    var radius = speeds[req.params.mode] * req.params.time * 60

    if (req.query.type) {
        var type = req.query.type
    } else {
        var type = "restaurant"
    }

    var possibleLocations = {}
    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ location + '&radius=' + radius + '&type=' + type + '&key=' + apiKey,
        headers: { }
    };
    axios(config)
    .then(function (response) {
        possibleLocations = response.data.results;
        res.send(JSON.stringify(possibleLocations));
    })
    .catch(function (error) {
        console.log(error);
    });


})

app.listen(port);