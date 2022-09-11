const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const city = req.body.cityName;
  const appid = "c098cc8073cb75daa7e1f9c0cd0262e6";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=metric";
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      const weatherinfo = weatherdata.weather[0].description;
      const temp = weatherdata.main.temp;
      const icon = weatherdata.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The weather in "+city+" is " + weatherinfo + ".</h1>");
      res.write("<p>The temperature in "+city+" is " + temp + " degrees.</p>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
})

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server is running.");
})
