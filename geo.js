import fetch from 'node-fetch';
var i;
const url = "https://eonet.gsfc.nasa.gov/api/v3/events?days=1";
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
            console.log(data.events[i].title)
        }
    }
})