import fetch from 'node-fetch';
const url = "https://eonet.gsfc.nasa.gov/api/v3/events?days=1";
fetch(url)
.then(response => response.json())
.then(data => {for(let i in data.events)
    {
    console.log("Title: " + data.events[i].title)
    console.log("Category: " + data.events[i].categories[0].title)
    }
});

