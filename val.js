import fetch from 'node-fetch';
const url = "https://eonet.sci.gsfc.nasa.gov/api/v3/events";
fetch(url)
.then(response => response.json())
.then(data => console.log(data.events[0].title));

