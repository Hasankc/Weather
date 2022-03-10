//jshint esversion:6

  const express = require("express");
  const https = require('https');
  //  const bodyParser = require("body-parser");
  
  
  const app = express(); 

 
  
  // app.use(express.urlencoded({extended:true}));
  // app.use(express.static("public"));
  
  


    app.get("/result", function(req, res){
    res.sendFile(__dirname + "/index.html");
  });
      app.post("/", function(req, res){
    
      const city = req.body.cityName;

      const query = city
      const appKey = 'f9df0681f60a33fb0e12f66c79e2f007';
      const unit = "metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=metric";
    https.get(url, function(error, response, body) {
    //console.log(response.statusCode);
      if(!error && response.statusCode == 200) {
        console.log(body)
      } else {
        console.log(response.statusCode)
      }
      
      response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const tamp = weatherData.main.temp;
      const weatherDes = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgeURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is" + weatherDes + "</p>");
      res.write("<h1>the weather in" + query + "is"  + temp + "degrees Celcius</h1>");
      res.write("<img  src=" + imgeURL + " >");
      res.send();
    });

  });


}); 


app.listen(3000, function(){
 // res.send("Listening on port 3000");
})
