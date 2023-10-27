const express = require ("express");
const app= express();
const https=require("https");
const bodyParser=require ("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

}); 

app.post("/",function(req,res){

const cn=req.body.cityName;

const url="https://api.openweathermap.org/data/2.5/weather?q="+cn+"&appid=PUT_YOUR_OWN_API_ID_FROM_OPEN_WEATHERMAP_&units=metric";
https.get(url,function(response){
    // console.log(response.statusCode);

    response.on("data",function(data){
        const wd=JSON.parse(data);
        const pop=wd.main.temp;
        const desc= wd.weather[0].description;
        const icon=wd.weather[0].icon;
        
        const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The temperature in "+cn+" is "+pop+" degrees celsius</h1>");
        res.write("<h3>The weather is currently "+desc+"</h3>");
        res.write("<img src="+imgUrl+">");
        res.send();
    });
});
});


    app.listen(3000,function(){
    console.log("Server running at port 3000.");
});