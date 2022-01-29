import fetch from "node-fetch"; // Helps us send a url request to gather data from a site/API

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

fetch(url + api_key)
.then(response => response.json())
.then(data => {
    console.log("There are " + data.element_count + " near earth objects today")
    console.log("");
        for(j = 0; j < data.element_count; j++)
        {
            // Asteroid name
            console.log("Asteroid Name: " + data.near_earth_objects[currentDate][j].name);
            // Asteroid diameter
            console.log("Estimated Diameter: " + Math.round((data.near_earth_objects[currentDate][j].estimated_diameter.meters.estimated_diameter_min + data.near_earth_objects[currentDate][j].estimated_diameter.meters.estimated_diameter_max)/2) + " meters");
            // Asteroid's distance from Earth
            console.log("Distance from Earth: " + Math.round(data.near_earth_objects[currentDate][j].close_approach_data[0].miss_distance.kilometers) + " km");
            // Asteroid's velocity
            console.log("Velocity: " + Math.round(data.near_earth_objects[currentDate][j].close_approach_data[0].relative_velocity.kilometers_per_hour) + " km/hr");
            // Asteroid's closest approach date and time
            console.log("Close Approach date and time: " + data.near_earth_objects[currentDate][j].close_approach_data[0].close_approach_date_full);
            
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

})