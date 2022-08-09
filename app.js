const { json } = require('express');
const express = require('express');

const app = express(json);
const apiKey = "AIzaSyCGngGGClD4hATm3ZfMN4gW9tW0QtyJ_OQ"

var axios = require('axios');

var speeds = {
    "walk": 1.4
}

app.get('/', (req, res) => {
  res.send("Welcome to NearBy");
});

app.get('/:lat/:long/:mode/:time', (req,res) => {
    var location = req.params.lat + "%2C" + req.params.long
    var radius = speeds[req.params.mode] * req.params.time * 60

    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ location + '&radius=' + radius + '&type=restaurant&key=' + apiKey,
        headers: { }
    };

    axios(config)
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
})

app.listen(3000);