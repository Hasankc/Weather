//jshint esversion:6

  const express = require("express");
  const https = require("https");
  const bodyParser = require("body-parser");
  

 
    //app.use(bodyParser.urlencoded({ extended: true }));

  const app = express(); 

    app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
  });
    app.post("/", function(req, res){
    
       
      const appid = 'f9df0681f60a33fb0e12f66c79e2f007';
      const query=req.body.cityName;
      const unit = "metric";
      const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query+ '&appid=' +appid +'&units=' + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

      
      response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const tamp = weatherData.main.temp;
      const weatherDes = weatherData.weather[0].Des;
      const icon = weatherData.weather[0].icon;
      const imgeURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("The weather is" + weatherDes);
      res.write("<h1>the weather" + temp + "in"  + query + "here</h1>");
      res.write("<img  src=" + imgeURL + " >");
      res.send();
    });

  });


}); 


app.listen(3000, function(){
 // res.send("Listening on port 3000");
})
