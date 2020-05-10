const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(express.static("public"));
app.listen(3000,()=>{
    console.log("server started at port 3000");
})
app.set("view engine", "ejs");
const date=new Date();
var options={
    weekday:"long",
    month:"long",
    year:"numeric"
}
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/',(req,resp)=>{
resp.sendFile(__dirname+"/index.html");
})
app.post('/',(req,resp)=>{
    const curr=date.toLocaleDateString("en-US",options);
    const cityname=req.body.cityName;
    console.log(cityname);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid=b90d375dd6e9855ab941a837de154d5e";
    https.get(url,(response)=>{
        response.on("data",(d)=>{
            const dat=JSON.parse(d);
            console.log(dat);

            const temp=dat.main.temp;   
       const desc=dat.weather[0].description
       const img=dat.weather[0].icon   
            resp.render("report",{current:curr,cityname:cityname,temperature:temp,description:desc ,image:img})
//        resp.write("<h1 align=center style=color:blue >"+curr+"</h1>")
//        resp.write("<h1 align=center style=color:red >"+cityname+"</h1>")
//     resp.write("<p align=center color:red>"+desc+"</h1>");
//     resp.write("<img align=center src=http://openweathermap.org/img/wn/"+img+"@2x.png"+">");
//    resp.write("<h1 align=center>the temperature is "+ temp +" degrees </h1>")
}); 
 });
});     