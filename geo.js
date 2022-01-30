import fetch from 'node-fetch';
var i;
const url = "https://eonet.gsfc.nasa.gov/api/v3/events?days=2";
fetch(url)
.then(response => response.json())
.then(data => {
    if(data.events.length < 1)
    {
        console.log("No events today..")
    } 
    else
    {
        for(i in data.events)
        {
            console.log("Event: " + data.events[i].title)
            console.log("Category: " + data.events[i].categories[0].title)
            console.log()
        }
    }
})