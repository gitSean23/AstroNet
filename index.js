var req = new XMLHttpRequest();
var url = "https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&api_key=";
var api_key = "V5v2H5OyitzXWfhupVizWaOD9OMq08NVa0mQh4n6";

req.open("GET", url + api_key);
req.send();

