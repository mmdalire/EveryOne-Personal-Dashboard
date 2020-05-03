# EveryOne Personal Dashboard
EveryOne Personal Dashboard is a dashboard for web browsers that features 12/24 hour format clock, to do list, weather widget, and news widget. This dashboard works similarly to Momentum which is a downloadable Google Chrome Extension. For the weather and news widget, they are powered by OpenWeatherMap and News API respectively.

The widgets in this dashboard (Weather and News) uses an API (Application Programming Interface) and therefore uses an API code to access those data. Initially when you clone this project, the website will not work yet and multiple errors will show in the console since there are no API keys defined. 

## Getting the API keys
To get an API key, you must first need to create an account to both OpenWeatherMap and News API to obtain the keys. Visit these websites to sign-up and to learn more about their documentation and pricing: <br><br>
OpenWeatherMap - https://openweathermap.org/ <br>
News API - https://newsapi.org/

## Creating a config file to run the widgets and to remove errors in console
1) Create a config file named 'config.js' in the root directory of the project.
2) Open the config file in any text editor or IDE and write the following commands: <br>
```JavaScript
//Create an object that contains the keys
const keys = {
  'WEATHER KEY': <your API key from OpenWeatherMap>, 
  'NEWS KEY': <your API key from News API>
}
//You do not need to change anything in the index.html and main.js files to include the API keys. 
//The config file is automatically read by those files
```
3) Save the config file and open the index.html and you are good to go.
