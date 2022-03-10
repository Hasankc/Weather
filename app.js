const express=require("express");

const https=require("https");

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine','ejs');
app.get("/",function(req,res){
    
    res.render("weather");



});
app.get("/result",function(req,res){
    res.render("result");
})
app.post("/weather",function(req,res){

    const city=req.body.cityname;
   
    const query=city;
    const apiKey="ac31d3536effca6fc8a3e073c24776f8";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
    https.get(url,function(response){
    
   
    
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL=" http://openweathermap.org/img/wn/" +icon+ "@2x.png";


        res.render('result',{detail:description,temperature:temp,image:imageURL});

        
    
    
    });
});




});

let port=process.env.PORT;
if (port==null || port==""){
    port=3000;
}

app.listen(port,function(req,res){
    
});
