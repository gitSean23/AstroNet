import fetch from "node-fetch"; 
import express from "express";
var app = express();

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/earth', function(req, res){
   var i;
   const url = "https://eonet.gsfc.nasa.gov/api/v3/events?days=3";
   fetch(url)
   .then(response => response.json())
   .then(data => {
      if(data.events.length < 1)
      {
        console.log("No events today..")
      } 
      else
      {  
         let events = [];
         let categories = [];
         for(i in data.events)
         {  
            events.push("Event: " + data.events[i].title + " | Category: " + data.events[i].categories[0].title);
            // categories.push(data.events[i].categories[0].title);
            // console.log("Event: " + data.events[i].title)
            // console.log("Category: " + data.events[i].categories[0].title)
         } 
         var eventString = events.join("<br>");
         var catString = categories.join("<br>");
         
      }
      let html = `
      <!DOCTYPE html>
      <html lang="en">
      <style>
         body {
            background-image: url("https://wallpaperaccess.com/full/2217435.jpg");
            color: white;
         }
      </style>
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Earth</title>
      </head>
      <body>
          <div id = "title">Earth Events</p>
          <div id = "events">${eventString}</div>
      </body>
      </html>
      `;
      res.send(html);
   })
});

app.get('/asteroids', function(req, res){
   // j will be used in our for loop
var j;
const date = new Date(); // Instantiates a new date

// Gets the year, month, and day
let year = date.getFullYear();
let month = date.getMonth()+1;
let day = date.getDate(); 

var currentDay = day; // Declaring the current day

// Checking to see if the month and/or day is less than 10
// If so, we add a "0" to the corresponding values
if (day < 10)
{   
    currentDay = "0" + day;
}

var currentMonth = month;

if (month < 10)
{
    currentMonth = "0" + month;
}

var currentDate;

// Otherwise, we keep the year, month, and day the same
currentDate = year + "-" + currentMonth + "-" + currentDay;


console.log("Date: " + currentDate);

let url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + currentDate + "&end_date=" + currentDate + "&api_key=";
const api_key = "h4wNyCx6xILSNlYSqxkNYdovoVNbyrxpe35aAdNF";

var asteroidString;
fetch(url + api_key)
.then(response => response.json())
.then(data => {
      var asteroids = [];
   //  console.log("There are " + data.element_count + " near earth objects today")
   //  console.log("");
        for(j = 0; j < data.element_count; j++)
        {   
            asteroids.push("Asteroid Name: " + data.near_earth_objects[currentDate][j].name + "\n" + "Estimated Diameter: " + Math.round((data.near_earth_objects[currentDate][j].estimated_diameter.meters.estimated_diameter_min + data.near_earth_objects[currentDate][j].estimated_diameter.meters.estimated_diameter_max)/2) + " meters" + "\n" + "Distance from Earth: " + Math.round(data.near_earth_objects[currentDate][j].close_approach_data[0].miss_distance.kilometers) + " km" + "\n" + "Velocity: " + Math.round(data.near_earth_objects[currentDate][j].close_approach_data[0].relative_velocity.kilometers_per_hour) + " km/hr" + "\n" + "Close Approach date and time: " + data.near_earth_objects[currentDate][j].close_approach_data[0].close_approach_date_full);
            // Asteroid name
            // console.log("Asteroid Name: " + data.near_earth_objects[currentDate][j].name);
            // Asteroid diameter
            // console.log("Estimated Diameter: " + Math.round((data.near_earth_objects[currentDate][j].estimated_diameter.meters.estimated_diameter_min + data.near_earth_objects[currentDate][j].estimated_diameter.meters.estimated_diameter_max)/2) + " meters");
            // Asteroid's distance from Earth
            // console.log("Distance from Earth: " + Math.round(data.near_earth_objects[currentDate][j].close_approach_data[0].miss_distance.kilometers) + " km");
            // Asteroid's velocity
            // console.log("Velocity: " + Math.round(data.near_earth_objects[currentDate][j].close_approach_data[0].relative_velocity.kilometers_per_hour) + " km/hr");
            // Asteroid's closest approach date and time
            // console.log("Close Approach date and time: " + data.near_earth_objects[currentDate][j].close_approach_data[0].close_approach_date_full);
            
            // Checking if the asteroid is a potential threat to Earth
            if(data.near_earth_objects[currentDate][j].is_potentially_hazardous_asteroid)
            {  
                console.log("Potentially hazardous!");
            }

            else
            {
                console.log("Safe!");
            }
            
            // Clean seperation of each asteroid
            console.log("");
            console.log("---------------------------------");
            console.log("");
        }
        console.log("Hi!");
        asteroidString = asteroids.join("<br>");

        let html = `
      <!DOCTYPE html>
      <html lang="en">
      <style>
        body {
           background-image: url("https://wallpaperaccess.com/full/2217435.jpg");
           color: white;
        }


      </style>
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Asteroids</title>
      </head>
      <body>
          <div id = "title">Asteroid Watcher</p>
          <div id = "asteroid">${asteroidString}</div>
      </body>
      </html>
      `;
   res.send(html);
})
   
});

app.use(express.static('public'))
app.listen(3000);


