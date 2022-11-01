const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const apiKey = require('./config');

const port = 3001;
const host = 'localhost';

 
app.use(bodyParser.urlencoded({extended: true}));

 
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
 
app.post('/', function(req, res){

    const query = req.body.cityName;
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=' + unit + '&appid=' + apiKey.api.key;
    https.get(url, function(response){
        console.log('statusCode: ',  response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const urlIcon = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';

            res.write('<h1>Temperature in ' + query + ' is : ' + temp + ' degrees Celcius.</h1>');
            res.write('<p>The wheather is currently : ' + weatherDescription + '.</p>');
            res.write('<img src=' + urlIcon + '>');
            res.send()

            console.log('Temperature in ' +  query +': ', temp, 'degrees Celcius.');
            console.log('Wheather description: ', weatherDescription);
            })
    })
});

app.listen(port, host, function(){
    console.log(`The server is running on port ${host}:${port}`);
});
