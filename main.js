//Background
const page = document.querySelector("html");
//For time
const displayTime = document.querySelector("#time"); //Get the time display
let displayAmOrPm = true; //Check whether to display 12 or 24 hr format
//For greeting
const greetingPerson = document.querySelector("#greeting-person");
//For message
const messageContent = document.querySelector("#message-content");

//To do variables
const todoLogo = document.querySelector("#todo-icon");
const todoClose = document.querySelector(".todo-list-container #close");
const todoNavbar = document.querySelector(".todo-list-container");
//Add to do variables
const addToListButton = document.querySelector("#add-todo");
const addToDoList = document.querySelector(".add-todo-lists");
//Create to do item
const createToDo = document.querySelector("#create-todo");

//Weather variables
const weatherLogo = document.querySelector("#weather-icon");
const weatherClose = document.querySelector(".weather-list-container #close");
const weatherNavbar = document.querySelector(".weather-list-container");

const countryInput = document.querySelector("#country-input");
const cityInput = document.querySelector("#city-input");
const submitPlaces = document.querySelector("#submit-location");

const mainTemp = document.querySelector(".weather-current-temperature");
const minTemp = document.querySelector(".weather-low-temperature");
const maxTemp = document.querySelector(".weather-high-temperature");

//News variables
const newsLogo = document.querySelector("#news-logo");
const newsClose = document.querySelector(".news-list-container #close");
const newsNavbar = document.querySelector(".news-list-container");

const inputKeyword = document.querySelector("#input-keywords");
const searchKeyword = document.querySelector("#search-news-keyword");
const countrySelect = document.querySelector("#news-country");
const categorySelect = document.querySelector("#news-category");
const searchAdvancedKeywords = document.querySelector("#advanced-search-news");

const showAdvancedSearchButton = document.querySelector(
  "#show-advanced-search"
);
const advancedSearchSection = document.querySelector(
  ".advanced-search-section"
);

const newsContainer = document.querySelector(".headline-section");

//Error handling
const mainErrorBlock = document.querySelector(".modal-container");
const exitModal = document.querySelector("#ok");

//Footer
const footerCredit = document.querySelector(".footer-image-credits");

//Parse zero whenever the time is in one digit (except hours)
const parseZero = (time) => (time < 10 ? `0${time}` : time.toString());

//Display the time
const changeTime = () => {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  //Change the greeting according to hours
  changeGreeting(hours);

  //Wants to display 12 hour
  if (displayAmOrPm === true) {
    displayTime.textContent = `${
      hours % 12 === 0 ? 12 : hours % 12
    }:${parseZero(minutes)}:${parseZero(seconds)}`;

    if (hours < 12) displayTime.textContent += " AM";
    //If AM
    else displayTime.textContent += " PM"; //Or PM
  }
  //Display 24 hour
  else {
    displayTime.textContent = `${hours}:${parseZero(minutes)}:${parseZero(
      seconds
    )}`;
  }

  //Make the clock run automatically
  setInterval(changeTime, 1000);
};

const changeWallpaper = (hours) => {
  const wallpaper = document.querySelector("body");
  const creditLink = document.createElement("a");

  footerCredit.textContent = "";
  //Sunrise
  if (hours >= 5 && hours < 8) {
    wallpaper.style.background = "url(images/sunrise.jpg)";
    wallpaper.style.backgroundPosition = "center";
    wallpaper.style.backgroundSize = "cover";
    wallpaper.style.backgroundRepeat = "no-repeat";
    wallpaper.style.transition = "1s all";
    creditLink.setAttribute("href", "https://www.pexels.com/@grizzlybear");
    creditLink.textContent = "Sunrise: Photo by Jonathan Patersons from Pexels";
  }
  //Daylight
  else if (hours >= 8 && hours < 17) {
    wallpaper.style.background = "url(images/daylight.jpg)";
    wallpaper.style.backgroundPosition = "center";
    wallpaper.style.backgroundSize = "cover";
    wallpaper.style.backgroundRepeat = "no-repeat";
    wallpaper.style.transition = "1s all";
    creditLink.setAttribute(
      "href",
      "https://www.pexels.com/@brandon-montrone-230847"
    );
    creditLink.textContent = "Daylight: Photo by Brandon Montrone from Pexels";
  }
  //Sunset
  else if (hours >= 17 && hours < 19) {
    wallpaper.style.background = "url(images/sunset.jpg)";
    wallpaper.style.backgroundPosition = "center";
    wallpaper.style.backgroundSize = "cover";
    wallpaper.style.backgroundRepeat = "no-repeat";
    wallpaper.style.transition = "1s all";
    creditLink.setAttribute("href", "https://www.pexels.com/@brittany-17733");
    creditLink.textContent = "Sunset: Photo by brittany from Pexels";
  }
  //Evening
  else {
    wallpaper.style.background = "url(images/nighttime.jpg)";
    wallpaper.style.backgroundPosition = "bottom center";
    wallpaper.style.backgroundSize = "cover";
    wallpaper.style.backgroundRepeat = "no-repeat";
    wallpaper.style.transition = "1s all";
    creditLink.setAttribute("href", "https://www.pexels.com/@sanaan");
    creditLink.textContent = "Nighttime: Photo by Sanaan Mazhar from Pexels";
  }

  creditLink.setAttribute("target", "_blank");
  footerCredit.appendChild(creditLink);
};

//Change the greeting based on time
const changeGreeting = (hours) => {
  const greeting = document.querySelector("#greeting");

  if (hours >= 0 && hours < 12) greeting.textContent = "Good morning, ";
  else if (hours >= 12 && hours < 18) greeting.textContent = "Good afternoon, ";
  else greeting.textContent = "Good evening, ";
};

//Check if a name exists in the local storage
const doesNameExists = () => {
  if (localStorage.getItem("GREET-NAME") === null) return;
  greetingPerson.textContent = localStorage.getItem("GREET-NAME").toString();
};

//Check if a message exists
const doesMessageExists = () => {
  if (localStorage.getItem("MESSAGE") === null) return;
  messageContent.textContent = localStorage.getItem("MESSAGE").toString();
};

//Create a new to do item
const createToDoItem = () => {
  if (validateToDoItem() === true) return; //Does not create an element when one of the inputs is invalid

  //Create elements
  const todoItem = document.createElement("div");
  const todoHeader = document.createElement("div");
  const todoDone = document.createElement("span");
  const todoTitle = document.createElement("div");
  const todoItemName = document.createElement("h2");
  const todoDue = document.createElement("h4");
  const todoDueDate = document.createElement("span");
  1;
  const todoDueTime = document.createElement("span");
  const todoSeparator = document.createElement("hr");
  const todoDescription = document.createElement("p");
  const todoDelete = document.createElement("div");

  //Assigning the delete option
  const todoChecklist = document.createElement("i");
  todoChecklist.setAttribute("class", "far fa-circle");
  todoChecklist.setAttribute("id", "checklist");
  todoChecklist.setAttribute("checked", "");

  //Assigning classes or ids to elements
  todoItem.setAttribute("class", "todo-item");
  todoHeader.setAttribute("class", "todo-header");
  todoDone.setAttribute("id", "done-todo");
  todoTitle.setAttribute("class", "todo-title");
  todoDueDate.setAttribute("id", "due-date");
  todoDueTime.setAttribute("id", "due-time");
  todoDelete.setAttribute("class", "todo-delete");

  //Placing of content to elements
  todoItemName.textContent = document.querySelector("#name-of-todo").value;
  todoDue.textContent = "Due: ";
  todoDueDate.textContent = `${document.querySelector("#date-of-todo").value} `;
  todoDueTime.textContent = document.querySelector("#time-of-todo").value;
  todoDescription.textContent = document.querySelector(
    "#description-of-todo"
  ).value;
  todoDelete.textContent = "Delete";

  //Convert date and time to more readable display
  const dateAndTime = compareDates(todoDueDate, todoDueTime);

  todoDone.appendChild(todoChecklist);

  todoDue.appendChild(dateAndTime[0]);
  todoDue.appendChild(dateAndTime[1]);

  todoTitle.appendChild(todoItemName);
  todoTitle.appendChild(todoDue);

  todoHeader.appendChild(todoDone);
  todoHeader.appendChild(todoTitle);

  todoItem.appendChild(todoHeader);
  todoItem.appendChild(todoSeparator);
  todoItem.appendChild(todoDescription);
  todoItem.appendChild(todoDelete);

  document.querySelector(".todo-lists").appendChild(todoItem);

  todoListeners(todoItem, todoChecklist, todoDelete); //Event listeners
  saveToDo(todoItem); //Save the todo item to local storage
  clearFormat(); //Clears the format
};

//Validation of data in input
const validateToDoItem = () => {
  const name = document.querySelector("#name-of-todo");
  const date = document.querySelector("#date-of-todo");
  const time = document.querySelector("#time-of-todo");
  let hasErrors = false;

  //Name input is empty
  if (name.value === "" || name.value === undefined) {
    hasErrors = true;
    name.style.border = "solid 2px red";
  } else {
    name.style.border = "none";
  }

  //Date is empty
  if (date.value === undefined || date.value === "") {
    hasErrors = true;
    date.style.border = "solid 2px red";
  } else {
    date.style.border = "none";
  }

  //Time is empty
  if (time.value === undefined || time.value === "") {
    hasErrors = true;
    time.style.border = "solid 2px red";
  } else {
    time.style.border = "none";
  }

  return hasErrors;
};

//Event listeners to be added in each to do
const todoListeners = (item, checklistItem, deleteItem) => {
  //Check or uncheck the task in the to do
  checklistItem.addEventListener("click", () => {
    if (item.style.color === "white") {
      checklistItem.style.borderRadius = "20px";
      checklistItem.style.border = "3px solid green";
      checklistItem.style.backgroundColor = "green";
      item.style.color = "gray";

      checklistItem.setAttribute("checked", "true");
    } else {
      checklistItem.style.borderRadius = "20px";
      checklistItem.style.border = "3px solid transparent";
      checklistItem.style.backgroundColor = "transparent";
      item.style.color = "white";

      checklistItem.setAttribute("checked", "false");
    }
    //Save state
    localStorage.setItem(
      item.querySelector(".todo-title h2").textContent,
      item.outerHTML
    );
  });

  //Display the delete option in every task
  item.addEventListener("click", () => {
    deleteItem.style.color = "white";
    if (deleteItem.style.display === "block") deleteItem.style.display = "none";
    else deleteItem.style.display = "block";
  });

  //Deletes the task
  deleteItem.addEventListener("click", () => {
    localStorage.removeItem(item.querySelector(".todo-title h2").textContent);
    document.querySelector(".todo-lists").removeChild(item);
  });
};

//Comparing of dates in todo
const compareDates = (todoDate, todoTime) => {
  const inputDate = new Date(`${todoDate.textContent} ${todoTime.textContent}`); //Get the input date
  const todayDate = new Date(); //Get the current date
  inputDate.setSeconds(0, 0);
  todayDate.setSeconds(0, 0);

  //Display the to do if it is overdue
  if (inputDate < todayDate) {
    todoDate.style.color = "red";
    todoTime.style.color = "red";
    return [todoDate, todoTime];
  }
  //Display whether the to do is due on the day or overdue
  else if (
    inputDate.getFullYear() === todayDate.getFullYear() &&
    inputDate.getMonth() + 1 === todayDate.getMonth() + 1 &&
    inputDate.getDate() === todayDate.getDate()
  ) {
    todoDate.style.color = "orange";
    todoTime.style.color = "orange";
    return [todoDate, todoTime];
  }
  //Display the to do if not overdue
  else {
    return [todoDate, todoTime];
  }
};

//Clear the input format
const clearFormat = () => {
  //To do
  document.querySelector("#name-of-todo").value = "";
  document.querySelector("#date-of-todo").value = "";
  document.querySelector("#time-of-todo").value = "";
  document.querySelector("#description-of-todo").value = "";

  //Weather
  document.querySelector("#country-input").value = "";
  document.querySelector("#city-input").value = "";
};

//Saving the todo item to local storage
const saveToDo = (todoItem) => {
  const todoName = todoItem.querySelector(".todo-item h2").textContent;
  localStorage.setItem(todoName, todoItem.outerHTML);
};

//Retrieve the todo item in local storage
const retrieveToDo = () => {
  const domParser = new DOMParser();
  let items = Object.keys(localStorage);
  items = items
    .filter((elements) => elements !== "MESSAGE" && elements !== "GREET-NAME")
    .sort();

  //Retrieve all todo in local storage
  for (let i = 0; i < items.length; i++) {
    const parsedElement = domParser.parseFromString(
      localStorage.getItem(items[i]),
      "text/html"
    );
    const todoItem = parsedElement.querySelector(".todo-item");
    const todoChecklist = parsedElement.querySelector("#checklist");
    const todoDelete = parsedElement.querySelector(".todo-delete");

    todoListeners(todoItem, todoChecklist, todoDelete); //Event
    document
      .querySelector(".todo-lists")
      .appendChild(parsedElement.querySelector(".todo-item"));
  }
};

//Update the dates in todo item in local storage
const updateToDo = () => {
  const todoDate = document.querySelectorAll("#due-date");
  const todoTime = document.querySelectorAll("#due-time");

  for (let i = 0; i < todoDate.length; i++) {
    compareDates(todoDate[i], todoTime[i]);
  }
};

//Display weather data to weather navigation bar
const displayWeather = (data) => {
  //Image logo
  const imageTemperature = document.querySelector("#current-weather");
  const weatherId = data.weather[0].id;
  //Naming display
  const cityDisplayName = document.querySelector("#city");
  const countryDisplayName = document.querySelector("#country");
  //Main temperature
  const mainTemperature = document.querySelector(
    ".weather-current-temperature"
  );
  //Minimum and maximum temperature
  const maxTemperature = document.querySelector(".weather-high-temperature");
  const minTemperature = document.querySelector(".weather-low-temperature");
  //Other information
  const mainWeather = document.querySelector("#weather-main");
  const description = document.querySelector("#weather-description");
  const wind = document.querySelector("#wind-information");
  const cloudiness = document.querySelector("#cloud-information");
  const pressure = document.querySelector("#pressure-information");
  const humidity = document.querySelector("#humidity-information");
  const sunriseTime = document.querySelector("#sunrise-information");
  const sunsetTime = document.querySelector("#sunset-information");

  //Set the weather icon in image source
  imageTemperature.setAttribute(
    "class",
    `owf owf-5x owf-${weatherId}-${weatherTime()}`
  );

  //Display the input name
  cityDisplayName.textContent = `${data.name} ,`;
  countryDisplayName.textContent = data.sys.country;

  //Display the temperature
  mainTemperature.textContent = convertTemperature(
    data.main.temp,
    "kelvin-to-celsius"
  );

  //Display the minimum and maximum temperature
  maxTemperature.textContent = convertTemperature(
    data.main.temp_max,
    "kelvin-to-celsius"
  );
  minTemperature.textContent = convertTemperature(
    data.main.temp_min,
    "kelvin-to-celsius"
  );

  //Other information display
  mainWeather.textContent = data.weather[0].main;
  description.textContent = data.weather[0].description;
  wind.textContent = `${data.wind.speed} m/s ${data.wind.deg}${degreesDirection(
    data.wind.deg
  )}`;
  cloudiness.textContent = cloudinessConversion(data.clouds.all);
  pressure.textContent = `${data.main.pressure.toString()} hPa`;
  humidity.textContent = `${data.main.humidity.toString()} %`;
  sunriseTime.textContent = `${new Date(
    data.sys.sunrise * 1000
  ).getHours()}:${parseZero(new Date(data.sys.sunrise * 1000).getMinutes())}`;
  sunsetTime.textContent = `${new Date(
    data.sys.sunset * 1000
  ).getHours()}:${parseZero(new Date(data.sys.sunset * 1000).getMinutes())}`;

  //Change background depending on the weather
  changeWeatherBackground(
    data.weather[0].main,
    new Date(data.dt * 1000).getHours()
  );
};

//Change weather icon based on time
const weatherTime = () => {
  return new Date().getHours() > 5 && new Date().getHours() < 19 ? "d" : "n";
};

//Convert temperature from Kelvin to Celsius and Fahrenheit
const convertTemperature = (temperature, degree) => {
  if (degree === "kelvin-to-celsius")
    return `${(temperature - 273.15).toFixed(2).toString()} °C`;
  else if (degree === "celsius")
    return `${((temperature - 32) * (5 / 9)).toFixed(2).toString()} °C`;
  else return `${(temperature * (9 / 5) + 32).toFixed(2).toString()} °F`;
};

//Convert degrees into readable direction
const degreesDirection = (degrees) => {
  if (degrees === undefined) return "";

  if (degrees > 0 && degrees <= 33.75) return " ( North )";
  else if (degrees > 33.75 && degrees <= 78.75) return " ( North East )";
  else if (degrees > 78.75 && degrees <= 123.75) return " ( East )";
  else if (degrees > 123.75 && degrees <= 168.75) return " ( South East )";
  else if (degrees > 168.75 && degrees <= 213.75) return " ( South )";
  else if (degrees > 213.75 && degrees <= 258.75) return " ( South West )";
  else if (degrees > 258.75 && degrees <= 303.75) return " ( West )";
  else if (degrees > 303.75 && degrees <= 348.75) return " ( North West )";
  else return " ( North )";
};

//Cloud conversion
const cloudinessConversion = (clouds) => {
  if (clouds >= 0 && clouds < 10) return " Clear ";
  else if (clouds >= 10 && clouds < 20) return " Fair ";
  else if (clouds >= 20 && clouds < 30) return " Mostly Fair ";
  else if (clouds >= 30 && clouds < 60) return " Partly Cloudy ";
  else if (clouds >= 60 && clouds < 90) return " Mostly Cloudy ";
  else return " Cloudy ";
};

//Change background
const changeWeatherBackground = (weather, time) => {
  const wallpaper = document.querySelector("body");
  const creditLink = document.createElement("a");
  footerCredit.textContent = "";

  if (weather === "Rain" || weather === "Thunderstorm") {
    if (time >= 7 && time < 19) {
      wallpaper.style.background = "url(images/rain-day.jpg)";
      wallpaper.style.backgroundPosition = "center bottom";
      wallpaper.style.backgroundSize = "cover";
      wallpaper.style.backgroundRepeat = "no-repeat";
      wallpaper.style.transition = "1s all";
      creditLink.textContent = "Rainy day: Photo by SHAH Shah on Unsplash";
      creditLink.setAttribute("href", "https://unsplash.com/@drjay93");
    } else {
      wallpaper.style.background = "url(images/rain-night.jpg)";
      wallpaper.style.backgroundPosition = "0 -100px";
      wallpaper.style.backgroundSize = "cover";
      wallpaper.style.backgroundRepeat = "no-repeat";
      wallpaper.style.transition = "1s all";
      creditLink.textContent =
        "Rainy night: Photo by Harry Cunningham on Unsplash";
      creditLink.setAttribute(
        "href",
        "https://unsplash.com/@harrycunnningham1"
      );
    }
    creditLink.setAttribute("target", "_blank");
    footerCredit.appendChild(creditLink);
  } else {
    changeWallpaper(new Date().getHours());
  }
};

//Success when the user activates the geolocation alert to gather device's location
const success = (pos) =>
  getWeatherData("", "", pos.coords.latitude, pos.coords.longitude);

//Get the device location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }
};

//Detect any errors while fetching data
const checkFetch = (response) => {
  if (!response.ok) throw response.status;
  return response;
};

//Display errors
const displayError = (errorCode) => {
  const error = document.querySelector(".modal-container");
  const errorTitle = document.querySelector(".modal-header");
  const errorBody = document.querySelector(".modal-content p");
  error.style.display = "block";
  weatherNavbar.style.top = "-100vh";
  newsNavbar.style.left = "-100vw";

  errorTitle.textContent = `Error ${errorCode}`;
  if (errorCode === 400)
    errorBody.textContent =
      "You've sent a bad request. You must have sent an empty input.";
  else if (errorCode === 401)
    errorBody.textContent = "Unauthorized access to one of the services.";
  else if (errorCode === 404) errorBody.textContent = "Location not found.";
  else if (errorCode === 503)
    errorBody.textContent = "The service is unavailable.";
  else {
    errorTitle.textContent = "Error";
    errorBody.textContent =
      "Cannot retrieve data due to invalid or empty inputs";
  }
};

//Process and display the weather information
const getWeatherData = (city, country, latitude, longitude) => {
  const apiUrl = "/.netlify/functions/get_weather?";
  const apiLatitude = `lat=${latitude}&`;
  const apiLongitude = `lon=${longitude}&`;
  const apiCity = city.value ? `${city.value},&` : "";
  const apiCountry = country.value ? `${country.value}&` : "";
  const api =
    city === "" && country === ""
      ? `${apiUrl}${apiLatitude}${apiLongitude}`
      : `${apiUrl}q=${apiCity}${apiCountry}`;

  fetch(api)
    .then(checkFetch) //Check for fetching errors
    .then((response) => response.json()) //Get the body of data
    .then(displayWeather) //Display the weather
    .catch(displayError); //Display errors
};

//Clear news data
const clearNewsData = () => {
  newsContainer.textContent = "";
};

//Display whether headline or everything
const endpointSettings = (endpoint) => {
  const header = document.querySelector("#endpoint-type");

  if (endpoint === "top-headlines&") {
    header.textContent = "Headline";
    countrySelect.disabled = false;
    categorySelect.disabled = false;
    searchAdvancedKeywords.disabled = false;
  } else {
    header.textContent = "Everything";
    countrySelect.disabled = true;
    categorySelect.disabled = true;
    searchAdvancedKeywords.disabled = true;
  }
};

//Convert gathered date to more readable one
const convertToReadableDate = (date) => {
  const publishedDate = new Date(date);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December",
  ];

  return `${
    month[publishedDate.getMonth()]
  } ${publishedDate.getDate()}, ${publishedDate.getFullYear()} - ${parseZero(
    publishedDate.getHours()
  )}:${parseZero(publishedDate.getMinutes())}`;
};

//Process and display the news
const createNewsItem = (data) => {
  let maximumItems = data.articles.length >= 6 ? 6 : data.articles.length;
  const loadMoreButton = document.createElement("input");
  loadMoreButton.setAttribute("type", "submit");
  loadMoreButton.setAttribute("value", "Load More");
  loadMoreButton.setAttribute("id", "load-more-btn");

  for (let i = 0; i < maximumItems; i++) {
    const newsItem = document.createElement("div");
    const newsThumbnail = document.createElement("img");
    const newsContent = document.createElement("div");
    const newsDate = document.createElement("h5");
    const newsHeadline = document.createElement("h3");
    const newsAuthor = document.createElement("h5");
    const newsClickMore = document.createElement("div");
    const newsClickMoreDescription = document.createElement("p");
    const newsArrowDown = document.createElement("i");
    const newsDescriptionContainer = document.createElement("div");
    const newsDescription = document.createElement("p");
    const newsSources = document.createElement("div");
    const newsFullNews = document.createElement("a");
    const newsFullNewsDescription = document.createElement("p");
    const newsArrowRight = document.createElement("i");

    newsItem.setAttribute("class", "news-item");
    newsThumbnail.setAttribute("class", "news-thumbnail");
    newsThumbnail.setAttribute("alt", "News image");
    newsContent.setAttribute("class", "news-content");
    newsDate.setAttribute("id", "news-date-published");
    newsHeadline.setAttribute("id", "news-headline");
    newsAuthor.setAttribute("id", "news-author");
    newsClickMore.setAttribute("class", "click-more");
    newsArrowDown.setAttribute("class", "fas fa-chevron-down");
    newsArrowDown.setAttribute("id", "click-arrow");
    newsDescriptionContainer.setAttribute(
      "class",
      "news-description-container"
    );
    newsDescription.setAttribute("class", "news-description");
    newsSources.setAttribute("class", "news-sources");
    newsFullNews.setAttribute("class", "click-full-news");
    newsArrowRight.setAttribute("class", "fas fa-chevron-right");
    newsArrowRight.setAttribute("id", "click-arrow");

    if (data.articles[i].urlToImage !== null)
      newsThumbnail.setAttribute("src", data.articles[i].urlToImage);
    else newsThumbnail.setAttribute("src", "images/no_image.jpg");

    newsThumbnail.setAttribute("alt", `News image`);
    newsDate.textContent = convertToReadableDate(data.articles[i].publishedAt);
    newsHeadline.textContent = data.articles[i].title;
    newsAuthor.textContent = data.articles[i].author;
    newsClickMoreDescription.textContent = "Click here to view description";
    newsDescription.textContent = data.articles[i].description;
    newsSources.textContent = `Source by: ${data.articles[i].source.name}`;
    newsFullNewsDescription.textContent = "Click here to find out more";
    newsFullNews.setAttribute("href", data.articles[i].url);
    newsFullNews.setAttribute("target", "_blank");

    newsFullNews.appendChild(newsArrowRight);
    newsFullNews.appendChild(newsFullNewsDescription);

    newsClickMore.appendChild(newsArrowDown);
    newsClickMore.appendChild(newsClickMoreDescription);

    newsDescriptionContainer.appendChild(newsDescription);
    newsDescriptionContainer.appendChild(newsSources);
    newsDescriptionContainer.appendChild(newsFullNews);

    newsContent.appendChild(newsDate);
    newsContent.appendChild(newsHeadline);
    newsContent.appendChild(newsAuthor);
    newsContent.appendChild(newsClickMore);
    newsContent.appendChild(newsDescriptionContainer);

    newsItem.appendChild(newsThumbnail);
    newsItem.appendChild(newsContent);

    newsContainer.appendChild(newsItem);

    //View full description
    newsClickMore.addEventListener("click", () => {
      newsClickMore.style.display = "none";
      newsDescriptionContainer.style.display = "block";
    });
  }
  data.articles.splice(0, maximumItems); //Remove showed news in the array

  if (data.articles.length > 0) newsContainer.appendChild(loadMoreButton); //Show load more when there are more news to show

  //Cleares the load more button when it is clicked
  loadMoreButton.addEventListener("click", () => {
    newsContainer.removeChild(loadMoreButton);
    createNewsItem(data);
  });
};

//Fetch news data
const getNewsData = (keyword, country, category) => {
  const apiUrl = "/.netlify/functions/get_news?";
  const apiEndpoint =
    keyword !== undefined && keyword !== "" ? "everything&" : "top-headlines&";
  const apiKeyword =
    keyword !== undefined && keyword !== "" ? `q=${keyword}&` : "";
  const apiCountry =
    country !== undefined &&
    country !== "none" &&
    apiEndpoint === "top-headlines&"
      ? `country=${country}&`
      : "";
  const apiCategory =
    category !== undefined &&
    category !== "none" &&
    apiEndpoint === "top-headlines&"
      ? `category=${category}`
      : "";
  const api = `${apiUrl}endpoint=${apiEndpoint}${apiKeyword}${apiCountry}${apiCategory}`;
  //Change search parameters by endpoint
  endpointSettings(apiEndpoint);

  fetch(api)
    .then(checkFetch)
    .then((response) => response.json())
    .then(createNewsItem)
    .catch(displayError);
};

changeWallpaper(new Date().getHours());
changeTime();
doesNameExists();
doesMessageExists();
retrieveToDo();
updateToDo();
getLocation();
getNewsData(undefined, "ph", undefined);

//Toggle when the user wants 12 or 24 hour format
displayTime.addEventListener("click", () => {
  if (displayAmOrPm === true) displayAmOrPm = false;
  else displayAmOrPm = true;
});

//When user clicks enter
greetingPerson.addEventListener("keypress", (e) => {
  //If there are no placed inputs yet
  if (greetingPerson.textContent === "[Enter name here]") {
    greetingPerson.textContent = "";
  }

  //Whenever the user clicks Enter
  if (e.key === "Enter") {
    localStorage.setItem("GREET-NAME", greetingPerson.textContent);
    greetingPerson.blur();
  }
});

//When a user clicks out of the text
greetingPerson.addEventListener("blur", () => {
  localStorage.setItem("GREET-NAME", greetingPerson.textContent);
});

//When a user clicks enter in message box
messageContent.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    localStorage.setItem("MESSAGE", messageContent.textContent);
    messageContent.blur();
  }
});

//When a user clicks out of the message box
messageContent.addEventListener("blur", () => {
  localStorage.setItem("MESSAGE", messageContent.textContent);
});

//To do section
todoLogo.addEventListener("click", () => {
  todoNavbar.style.right = "0";
  page.style.overflowY = "hidden";
});

todoClose.addEventListener("click", () => {
  todoNavbar.style.right = "-100vw";
  page.style.overflowY = "auto";
});

//Add to do button
addToListButton.addEventListener("click", () => {
  if (addToDoList.style.display === "block") {
    addToListButton.style.backgroundColor = "transparent";
    addToListButton.textContent = "+ Add to-do";
    addToDoList.style.display = "none";
  } else {
    addToListButton.style.backgroundColor = "rgb(236, 182, 2)";
    addToListButton.textContent = "Close";
    addToDoList.style.display = "block";
  }
});

//Once the create to do is placed
createToDo.addEventListener("click", () => {
  createToDoItem();
});

//Open navigation bar
weatherLogo.addEventListener("click", () => {
  weatherNavbar.style.top = "0";
  page.style.overflowY = "hidden";
});

//Close navigation bar
weatherClose.addEventListener("click", () => {
  weatherNavbar.style.top = "-100vh";
  page.style.overflowY = "auto";
});

//Submit location to see weather
submitPlaces.addEventListener("click", (e) => {
  getWeatherData(cityInput, countryInput, "", "");
  clearFormat();
});

//Convert Celsius to fahrenheit
mainTemp.addEventListener("click", () => {
  if (mainTemp.textContent === "--" || mainTemp.textContent === undefined)
    return;

  if (mainTemp.textContent[mainTemp.textContent.length - 1] === "C") {
    mainTemp.textContent = convertTemperature(
      parseFloat(mainTemp.textContent),
      "fahrenheit"
    );
    minTemp.textContent = convertTemperature(
      parseFloat(minTemp.textContent),
      "fahrenheit"
    );
    maxTemp.textContent = convertTemperature(
      parseFloat(maxTemp.textContent),
      "fahrenheit"
    );
  } else {
    mainTemp.textContent = convertTemperature(
      parseFloat(mainTemp.textContent),
      "celsius"
    );
    minTemp.textContent = convertTemperature(
      parseFloat(minTemp.textContent),
      "celsius"
    );
    maxTemp.textContent = convertTemperature(
      parseFloat(maxTemp.textContent),
      "celsius"
    );
  }
});

//News section
newsLogo.addEventListener("click", () => {
  newsNavbar.style.left = "0";
  page.style.overflowY = "hidden";
});

newsClose.addEventListener("click", () => {
  newsNavbar.style.left = "-100vw";
  page.style.overflowY = "auto";
});

//Show advanced search
showAdvancedSearchButton.addEventListener("click", () => {
  if (advancedSearchSection.style.display === "block") {
    showAdvancedSearchButton.style.backgroundColor = "white";
    showAdvancedSearchButton.textContent = "Advanced search";
    advancedSearchSection.style.display = "none";
  } else {
    showAdvancedSearchButton.style.backgroundColor = "rgb(236, 182, 2)";
    showAdvancedSearchButton.textContent = "Close search";
    advancedSearchSection.style.display = "block";
  }
});

//Search keyword button
searchKeyword.addEventListener("click", () => {
  clearNewsData();
  getNewsData(inputKeyword.value, "ph", undefined);
});

searchAdvancedKeywords.addEventListener("click", () => {
  clearNewsData();
  getNewsData(inputKeyword.value, countrySelect.value, categorySelect.value);
});

//Error handling
exitModal.addEventListener("click", () => {
  mainErrorBlock.style.display = "none";
});
