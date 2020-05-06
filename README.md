# EveryOne Personal Dashboard
EveryOne Personal Dashboard is a dashboard for web browsers that features 12/24 hour format clock, to-do list, weather widget, and news widget. It works as similarly to a donwloadable Google Chrome extension called Momentum. This dashboard contains the following features: <br>
1) It displays the current time based on your device (toggle the clock to change formats).
2) Background images change with respect to time and the weather in your current location (provided when the geolocation is allowed by the user).
3) To-do list where the user can add to-do items and store in your browser's local storage.
4) Weather widget displays information about your location's weather, temperature, and many more.
5) News widget displays headline and the user has the ability to search for keywords and filter them accoring to category and country.
6) Responsive to mobile devices (not fully bug free)

## Cloning of project
Gathering of data such as the weather and news are possible by using an API (Application Programming Interface). Using an API for both widgets requires you to create an account for the API service and get the keys to place it in the program and gather data. Initially when the website is opened, the weather and news widgets are empty and no data is displayed. To make those widgets work, follow these steps: 

### 1) Create an account in OpenWeatherMap and News API
Create an account for both API services to get the API key. Visit these links to create an account or to view their documentations and pricing. <br><br>
OpenWeatherMap: https://openweathermap.org/ <br>
News API: https://newsapi.org/ <br>

### 2) Install NPM packages
To perform this following step, you must have installed NodeJS in your device. You can download NodeJS from their website: https://nodejs.org/en/download/

##### Installing Netlify Lambda and Axios
After downloading, open the project in any IDE or text editor and open their integrated terminal (command prompt) to enter this following line of code in the root directory of the project:
```
npm install
```
This line installs the needed dependencies to run this project by a server. It installs 'netlify-lambda' to run in a server and 'axios' for fetching data. 

##### Installing dotenv package
Install this package to read the data from the .env file in which we will store the API keys and other confidential data.
```
npm install dotenv --save
```
Then save the file.

### 3) Create a .env file for storing API keys
In the root of the project, create a file with the name '.env'. In here place all the following credentials as wells as the API keys for them to be accessed by files later.
```
NEWS_URL_HEADLINE = https://newsapi.org/v2/top-headlines?
NEWS_URL_EVERYTHING = https://newsapi.org/v2/everything?
NEWS_KEY = <your News API key>

WEATHER_URL = http://api.openweathermap.org/data/2.5/weather?
WEATHER_KEY = <your OpenWeatherMap API key>
```

### 4) Create the following files
In the root directory, create a 'functions' folder and create two JavaScript files inside with the names 'get_news.js' and 'get-weather.js'. <br>

##### get_news.js
```JavaScript
const axios = require('axios');
require('dotenv').config()

exports.handler = function(event, context, callback) {
    //Basic parameters
    const API_NEWS_URL_HEADLINE = process.env.NEWS_URL_HEADLINE;;
    const API_NEWS_URL_EVERYTHING = process.env.NEWS_URL_EVERYTHING;
    const API_NEWS_KEY = process.env.NEWS_KEY;
    //Query strings
    const endpoint = event.queryStringParameters.endpoint;
    const country = (event.queryStringParameters.country !== undefined) ? `&country=${event.queryStringParameters.country}` : '';
    const category = (event.queryStringParameters.category !== undefined) ? `&category=${event.queryStringParameters.category}` : '';
    const keyword = `&q=${event.queryStringParameters.q}`;
    //URL
    let URL;
    if(endpoint === 'top-headlines') {
        URL = `${API_NEWS_URL_HEADLINE}apiKey=${API_NEWS_KEY}${country}${category}`;
    }
    else {
        URL = `${API_NEWS_URL_EVERYTHING}apiKey=${API_NEWS_KEY}${keyword}`;
    }
    
    //This function returns the fetched weather data or an error to the user
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        });
    }

    //Fetches the data from the weather API
    const getNews = () => {
        axios.get(URL)
        .then(response => send(response.data))
        .catch(error => send(error));
    }

    //This makes sure that the method used is 'GET' since we are getting data from the API
    if(event.httpMethod == 'GET') {
        getNews();
    }
}
```

##### get_weather.js
Inside this file, paste the following code: 
```Javascript
const axios = require('axios');
require('dotenv').config()

exports.handler = function(event, context, callback) {
    //Basic parameters from .env file
    const API_WEATHER_URL = process.env.WEATHER_URL;
    const API_WEATHER_KEY = process.env.WEATHER_KEY;
    
    //Query strings for additional paramters in gathering weather data such as the city and country name
    const place = (event.queryStringParameters.q === undefined) ? '' : `q=${event.queryStringParameters.q}`;
    const latitude = (event.queryStringParameters.lat === undefined) ? '' : `lat=${event.queryStringParameters.lat}`;
    const longitude =  (event.queryStringParameters.lon === undefined) ? '' : `lon=${event.queryStringParameters.lon}`;
    //URL
    const URL = `${API_WEATHER_URL}appid=${API_WEATHER_KEY}&${place}&${latitude}&${longitude}`;

    //This function returns the fetched weather data or an error to the user
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        });
    }

    //Fetches the data from the weather API
    const getWeather = () => {
        axios.get(URL)
        .then(res => send(res.data)) 
        .catch(err => send(err));
    }

    //This makes sure that the method used is 'GET' since we are getting data from the API
    if(event.httpMethod == 'GET') {
        getWeather();
    }
}
```
Save the files. <br>
For more detailed documentation on how this functions work, visit this website: https://docs.netlify.com/functions/build-with-javascript/#format

### 5) Change the following lines of code in the main JavaScript file
Open the main.js file in the root directory and change the following code in lines 525 and 666 (coincidence).
These lines needs to be changed since you are not deploying the website in Netlify (yet or not) and you are only viewing it in the localhost. <br>
In line 525,
```JavaScript
const apiUrl = 'http://localhost:9000/get_weather?'; //Change the port number if port 9000 isn't working for your device
```
In line 666,
```JavaScript
const apiUrl = 'http://localhost:9000/get_news?'; //Change the port number if port 9000 isn't working for your device
```
Save the changes.

### 6) Run the lambda-build
Open the terminal again and run the following code to build the created lambda functions you created in the previous step:
```
npm run lambda-build
```

### 7) Run the server
Once the lambda functions has been built, run the server to try the news and weather widgets
```
npm run lambda-serve
```
