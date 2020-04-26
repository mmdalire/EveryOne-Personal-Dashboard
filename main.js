//For time
const displayTime = document.querySelector("#time"); //Get the time display
let displayAmOrPm = true; //Check whether to display 12 or 24 hr format
//For greeting
const greetingPerson = document.querySelector('#greeting-person');
//For message
const messageContent = document.querySelector('#message-content');

//To do variables
const todoLogo = document.querySelector('.todo-icon-container');
const todoClose = document.querySelector('#todo-close');
const todoNavbar = document.querySelector('.todo-list-container');
//Add to do variables
const addToListButton = document.querySelector('#add-todo');
const addToDoList = document.querySelector('.add-todo-lists');
//Create to do item
const createToDo = document.querySelector('#create-todo');

//Weather variables
const weatherLogo = document.querySelector('.weather-icon-container');
const weatherClose = document.querySelector('.weather-list-container #todo-close');
const weatherNavbar = document.querySelector('.weather-list-container');

const countryInput = document.querySelector('#country-input');
const cityInput = document.querySelector('#city-input');
const submitPlaces = document.querySelector('#submit-location');

const mainTemp = document.querySelector('.weather-current-temperature');
const minTemp = document.querySelector('.weather-low-temperature');
const maxTemp = document.querySelector('.weather-high-temperature');

//Parse zero whenever the time is in one digit (except hours)
const parseZero = time => time < 10 ? "0" + time : time;

//Display the time
const changeTime = () => {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  //Change the wallpaper according to hours
  changeWallpaper(hours);

  //Change the greeting according to hours
  changeGreeting(hours);

  //Wants to display 12 hour
  if(displayAmOrPm === true) {
    displayTime.textContent = `${hours % 12 === 0 ? 12 : hours % 12}:${parseZero(minutes)}:${parseZero(seconds)}`;

    if(hours < 12) displayTime.textContent += ` AM`; //If AM
    else displayTime.textContent += ` PM`; //Or PM
  }
  //Display 24 hour
  else {
    displayTime.textContent = `${hours}:${parseZero(minutes)}:${parseZero(seconds)}`;
  }

  //Make the clock run automatically
  //setInterval(changeTime, 1000);
};

const changeWallpaper = hours => {
  const wallpaper = document.querySelector('body');
  //Sunrise
  if(hours >= 5 && hours < 8) {
    wallpaper.style.background = 'url(images/sunrise.jpg)';
    wallpaper.style.backgroundPosition = '0 0';
    wallpaper.style.backgroundSize = 'cover';
    wallpaper.style.backgroundRepeat = 'no-repeat';
    wallpaper.style.transition = '1s all';
  }
  //Daylight
  else if(hours >= 8 && hours < 17) {
    wallpaper.style.background = 'url(images/daylight.jpg)';
    wallpaper.style.backgroundPosition = '0 -400px';
    wallpaper.style.backgroundSize = 'cover';
    wallpaper.style.backgroundRepeat = 'no-repeat';
    wallpaper.style.transition = '1s all';
  }
  //Sunset
  else if(hours >= 17 && hours < 19) {
    wallpaper.style.background = 'url(images/sunset.jpg)';
    wallpaper.style.backgroundPosition = '0 0';
    wallpaper.style.backgroundSize = 'cover';
    wallpaper.style.backgroundRepeat = 'no-repeat';
    wallpaper.style.transition = '1s all';
  }
  //Evening
  else {
    wallpaper.style.background = 'url(images/nighttime.jpg)';
    wallpaper.style.backgroundPosition = '0 -1000px';
    wallpaper.style.backgroundSize = 'cover';
    wallpaper.style.backgroundRepeat = 'no-repeat';
    wallpaper.style.transition = '1s all';
  }
}

//Change the greeting based on time
const changeGreeting = hours => {
  const greeting = document.querySelector('#greeting');
  
  if(hours >= 0 && hours < 12) greeting.textContent = 'Good morning, ';
  else if(hours >= 12 && hours < 18) greeting.textContent = 'Good afternoon, ';
  else greeting.textContent = 'Good evening, ';
}

//Check if a name exists in the local storage
const doesNameExists = () => {
  if(localStorage.getItem('GREET-NAME') === null) return;
  greetingPerson.textContent = localStorage.getItem('GREET-NAME').toString();
}

//Check if a message exists
const doesMessageExists = () => {
  if(localStorage.getItem('MESSAGE') === null) return;
  messageContent.textContent = localStorage.getItem('MESSAGE').toString();
}


//Create a new to do item 
const createToDoItem = () => {
  if(validateToDoItem() === true) return; //Does not create an element when one of the inputs is invalid

  //Create elements
  const todoItem = document.createElement('div');
  const todoHeader = document.createElement('div');
  const todoDone = document.createElement('span');
  const todoTitle = document.createElement('div');
  const todoItemName = document.createElement('h2');
  const todoDue = document.createElement('h4');
  const todoDueDate = document.createElement('span');1
  const todoDueTime = document.createElement('span');
  const todoSeparator = document.createElement('hr');
  const todoDescription = document.createElement('p');
  const todoDelete = document.createElement('div');

  //Assigning the delete option
  const todoChecklist = document.createElement('i');
  todoChecklist.setAttribute('class', 'far fa-circle');
  todoChecklist.setAttribute('id', 'checklist');
  todoChecklist.setAttribute('checked', '');

  //Assigning classes or ids to elements
  todoItem.setAttribute('class', 'todo-item');
  todoHeader.setAttribute('class', 'todo-header');
  todoDone.setAttribute('id', 'done-todo');
  todoTitle.setAttribute('class', 'todo-title');
  todoDueDate.setAttribute('id', 'due-date');
  todoDueTime.setAttribute('id', 'due-time');
  todoDelete.setAttribute('class', 'todo-delete');

  //Placing of content to elements
  todoItemName.textContent = document.querySelector('#name-of-todo').value;
  todoDue.textContent = 'Due: ';
  todoDueDate.textContent = document.querySelector('#date-of-todo').value + ' ';
  todoDueTime.textContent = document.querySelector('#time-of-todo').value;
  todoDescription.textContent = document.querySelector('#description-of-todo').value;
  todoDelete.textContent = 'Delete';
  
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
  
  document.querySelector('.todo-lists').appendChild(todoItem);

  todoListeners(todoItem, todoChecklist, todoDelete); //Event listeners
  saveToDo(todoItem); //Save the todo item to local storage
  clearFormat(); //Clears the format
}

//Validation of data in input
const validateToDoItem = () => {
  const name = document.querySelector('#name-of-todo');
  const date = document.querySelector('#date-of-todo');
  const time = document.querySelector('#time-of-todo');
  let hasErrors = false;

  //Name input is empty
  if(name.value === '' || name.value === undefined) {
    hasErrors = true;
    name.style.border = 'solid 2px red';
  }
  else {
    name.style.border = 'none';
  }

  //Date is empty
  if(date.value === undefined || date.value === '') {
    hasErrors = true;
    date.style.border = 'solid 2px red';
  }
  else {
    date.style.border = 'none';
  }

  //Time is empty
  if(time.value === undefined || time.value === '') {
    hasErrors = true;
    time.style.border = 'solid 2px red';
  }
  else {
    time.style.border = 'none';
  }

  return hasErrors;
}

//Event listeners to be added in each to do 
const todoListeners = (item, checklistItem, deleteItem) => {
  //Check or uncheck the task in the to do
  checklistItem.addEventListener('click', () => {
    if(item.style.color === 'white') {
      checklistItem.style.borderRadius = '20px';
      checklistItem.style.border = '3px solid green';
      checklistItem.style.backgroundColor = 'green';
      item.style.color = 'gray';

      checklistItem.setAttribute('checked', 'true');
    }
    else {
      checklistItem.style.borderRadius = '20px';
      checklistItem.style.border = '3px solid transparent';
      checklistItem.style.backgroundColor = 'transparent';
      item.style.color = 'white';

      checklistItem.setAttribute('checked', 'false');
    }
    //Save state
    localStorage.setItem(item.querySelector('.todo-title h2').textContent, item.outerHTML);
  });

  //Display the delete option in every task
  item.addEventListener('click', () => {
    deleteItem.style.color = 'white';
    if(deleteItem.style.display === 'none') deleteItem.style.display = 'block';
    else deleteItem.style.display = 'none';
  });

  //Deletes the task
  deleteItem.addEventListener('click', () => {
    localStorage.removeItem(item.querySelector('.todo-title h2').textContent);
    document.querySelector('.todo-lists').removeChild(item);
  });
}

//Comparing of dates in todo
const compareDates = (todoDate, todoTime) => {
  const inputDate = new Date(`${todoDate.textContent} ${todoTime.textContent}`); //Get the input date
  const todayDate = new Date(); //Get the current date
  inputDate.setSeconds(0,0);
  todayDate.setSeconds(0,0);

  //Display the to do if it is overdue
  if(inputDate < todayDate) {
    todoDate.style.color = 'red';
    todoTime.style.color = 'red';
    return [todoDate, todoTime];
  }
  //Display whether the to do is due on the day or overdue
  else if(inputDate.getFullYear() === todayDate.getFullYear() && inputDate.getMonth() + 1 === todayDate.getMonth() + 1 
  && inputDate.getDate() === todayDate.getDate()) {
      todoDate.style.color = 'orange';
      todoTime.style.color = 'orange';
      return [todoDate, todoTime];
  } 
  //Display the to do if not overdue
  else {
    return [todoDate, todoTime];
  }
}

//Clear the input format
const clearFormat = () => {
  document.querySelector('#name-of-todo').value = '';
  document.querySelector('#date-of-todo').value = '';
  document.querySelector('#time-of-todo').value = '';
  document.querySelector('#description-of-todo').value = '';
}

//Saving the todo item to local storage
const saveToDo = todoItem => {
  const todoName = todoItem.querySelector('.todo-item h2').textContent;
  localStorage.setItem(todoName, todoItem.outerHTML);
}

//Retrieve the todo item in local storage
const retrieveToDo = () => {
  const domParser = new DOMParser();
  let items = Object.keys(localStorage);
  items = items.filter(elements => elements !== 'MESSAGE' && elements !== 'GREET-NAME').sort();

  //Retrieve all todo in local storage
  for(let i = 0; i < items.length; i++) {
    const parsedElement = domParser.parseFromString(localStorage.getItem(items[i]), 'text/html');
    const todoItem = parsedElement.querySelector('.todo-item');
    const todoChecklist = parsedElement.querySelector('#checklist');
    const todoDelete = parsedElement.querySelector('.todo-delete');

    todoListeners(todoItem, todoChecklist, todoDelete); //Event
    document.querySelector('.todo-lists').appendChild(parsedElement.querySelector('.todo-item'));
  }
}

//Update the dates in todo item in local storage
const updateToDo = () => {
  const todoDate = document.querySelectorAll('#due-date');
  const todoTime = document.querySelectorAll('#due-time');

  for(let i = 0; i < todoDate.length; i++) {
    compareDates(todoDate[i], todoTime[i]);
  }
}

//Validate the weather inputs
const validationWeatherInfo = country => {
  let hasErrors = false;

  //If country value is empty
  if(country.value === undefined || country.value === '') {
    hasErrors = true;
    document.querySelector('#country-location').style.border = 'solid 2px red';
  }
  else {
    document.querySelector('#country-location').style.border = 'none';
  }

  return hasErrors;
}

//Convert temperature from Kelvin to Celsius and Fahrenheit
const convertTemperature = (temperature, degree) => {
  if(degree === 'kelvin-to-celsius') return (temperature - 273.15).toFixed(2).toString() + ' °C';
  else if(degree === 'celsius') return ((temperature - 32) * (5/9)).toFixed(2).toString() + ' °C';
  else if(degree === 'fahrenheit') return (temperature * (9/5) + 32).toFixed(2).toString() + ' °F';
}

//Convert degrees into readable direction 
const degreesDirection = degrees => {
  if(degrees > 0 && degrees <= 33.75) return ' ( North )';
  else if(degrees > 33.75 && degrees <= 78.75) return ' ( North East )';
  else if(degrees > 78.75 && degrees <= 123.75) return ' ( East )';
  else if(degrees > 123.75 && degrees <= 168.75) return ' ( South East )';
  else if(degrees > 168.75 && degrees <= 213.75) return ' ( South )';
  else if(degrees > 213.75 && degrees <= 258.75) return ' ( South West )';
  else if(degrees > 258.75 && degrees <= 303.75) return ' ( West )';
  else if(degrees > 303.75 && degrees <= 348.75) return ' ( North West )';
  else return ' ( North )';
}

//Cloud conversion
const cloudinessConversion = (clouds) => {
  if(clouds >= 0 && clouds < 10) return ' Clear ';
  else if(clouds >= 10 && clouds < 20) return ' Fair ';
  else if(clouds >= 20 && clouds < 30) return ' Mostly Fair ';
  else if(clouds >= 30 && clouds < 60) return ' Partly Cloudy ';
  else if(clouds >= 60 && clouds < 90) return ' Mostly Cloudy ';
  else return ' Cloudy ';
}

//Change background 
const changeWeatherBackground = (weather, time) => {
  const wallpaper = document.querySelector('body');

  if(weather === 'Rain') {
    if(time >= 7 && time < 19) {
      wallpaper.style.background = 'url(images/rain-day.jpg)';
      wallpaper.style.backgroundPosition = '0 -250px';
      wallpaper.style.backgroundSize = 'cover';
      wallpaper.style.backgroundRepeat = 'no-repeat';
      wallpaper.style.transition = '1s all';
    }
    else {
      wallpaper.style.background = 'url(images/rain-night.jpg)';
      wallpaper.style.backgroundPosition = '0 -100px';
      wallpaper.style.backgroundSize = 'cover';
      wallpaper.style.backgroundRepeat = 'no-repeat';
      wallpaper.style.transition = '1s all';
    }
  }   
  else {
    changeWallpaper(new Date().getHours());
  }   
}

//Process and display the weather information
const getWeatherData = (city, country) => {
  if(validationWeatherInfo(country)) return;

  //Declarations of some info for fetching data
  const weatherKey = keys.WEATHER_KEY; //API key
  const apiUrl = 'api.openweathermap.org/data/2.5/weather?q=';
  const cityInput = city.value ? city.value + ',' : '';
  const countryInput = country.value;
  const api = `http://${apiUrl}${cityInput}${countryInput}&appid=${weatherKey}`;

  //Fetching the data
  fetch(api)
  .then(response => response.json()) //Get the body of data
  .then(data => {
    //Image logo
    const imageTemperature = document.querySelector('#current-weather');
    const imageId = data.weather[0].icon;
    //Naming display
    const cityDisplayName = document.querySelector('#city');
    const countryDisplayName = document.querySelector('#country');
    //Main temperature
    const mainTemperature = document.querySelector('.weather-current-temperature');
    //Minimum and maximum temperature
    const maxTemperature = document.querySelector('.weather-high-temperature');
    const minTemperature = document.querySelector('.weather-low-temperature');
    //Other information
    const mainWeather = document.querySelector('#weather-main');
    const description = document.querySelector('#weather-description');
    const wind = document.querySelector('#wind-information');
    const cloudiness = document.querySelector('#cloud-information');
    const pressure = document.querySelector('#pressure-information');
    const humidity = document.querySelector('#humidity-information');
    const sunriseTime = document.querySelector('#sunrise-information');
    const sunsetTime = document.querySelector('#sunset-information');

    //Set the image source
    imageTemperature.setAttribute('src', `http://openweathermap.org/img/wn/${imageId}@2x.png`);

    //Display the input name
    cityDisplayName.textContent = data.name + ' ,';
    countryDisplayName.textContent = data.sys.country;
    
    //Display the temperature
    mainTemperature.textContent = convertTemperature(data.main.temp, 'kelvin-to-celsius');

    //Display the minimum and maximum temperature
    maxTemperature.textContent = convertTemperature(data.main.temp_max, 'kelvin-to-celsius');
    minTemperature.textContent = convertTemperature(data.main.temp_min, 'kelvin-to-celsius');

    //Other information display
    mainWeather.textContent = data.weather[0].main;
    description.textContent = data.weather[0].description;
    wind.textContent = data.wind.speed + ' m/s ' + data.wind.deg + degreesDirection(data.wind.deg);
    cloudiness.textContent = cloudinessConversion(data.clouds.all);
    pressure.textContent = data.main.pressure.toString() + ' hPa';
    humidity.textContent = data.main.humidity.toString() + ' %';
    sunriseTime.textContent = new Date(data.sys.sunrise * 1000).getHours() + ':' + parseZero(new Date(data.sys.sunrise * 1000).getMinutes());
    sunsetTime.textContent = new Date(data.sys.sunset * 1000).getHours() + ':' + parseZero(new Date(data.sys.sunset * 1000).getMinutes());

    //Change background depending on the weather
    changeWeatherBackground(data.weather[0].main, new Date(data.dt * 1000).getHours());
  })
  .catch(error => console.log(error));
}

changeTime();
doesNameExists();
doesMessageExists();
retrieveToDo();
updateToDo();

//Toggle when the user wants 12 or 24 hour format
displayTime.addEventListener('click', () => {
  if(displayAmOrPm === true) displayAmOrPm = false;
  else displayAmOrPm = true;
});

//When user clicks enter
greetingPerson.addEventListener('keypress', e => {
  //If there are no placed inputs yet
  if(greetingPerson.textContent === '[Enter name here]') {
    greetingPerson.textContent = '';
  }

  //Whenever the user clicks Enter
  if(e.key === 'Enter') {
    localStorage.setItem('GREET-NAME', greetingPerson.textContent);
    greetingPerson.blur();
  }
});

//When a user clicks out of the text
greetingPerson.addEventListener('blur', () => {
  localStorage.setItem('GREET-NAME', greetingPerson.textContent);
})

//When a user clicks enter in message box
messageContent.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    localStorage.setItem('MESSAGE', messageContent.textContent);
    messageContent.blur();
  }
});

//When a user clicks out of the message box
messageContent.addEventListener('blur', () => {
  localStorage.setItem('MESSAGE', messageContent.textContent);
});

//To do section
todoLogo.addEventListener('click', () => {
  todoNavbar.style.right = '0';
});

todoClose.addEventListener('click', () => {
  todoNavbar.style.right = '-300px';
});

//Add to do button
addToListButton.addEventListener('click', () => {
  if(addToDoList.style.display === 'none'){
    addToListButton.textContent = 'Close';
    addToDoList.style.display = 'block';
  }
  else {
    addToListButton.textContent = '+ Add todo';
    addToDoList.style.display = 'none';
  }
});

//Once the create to do is placed
createToDo.addEventListener('click', () => {
  createToDoItem();
});

//Weather section
//Open navigation bar
weatherLogo.addEventListener('click', () => {
  weatherNavbar.style.top = '0';
});

//Close navigation bar
weatherClose.addEventListener('click', () => {
  weatherNavbar.style.top = '-180px';
});

//Submit location to see weather
submitPlaces.addEventListener('click', e => {
  getWeatherData(cityInput, countryInput);
});

//Convert Celsius to fahrenheit
mainTemp.addEventListener('click', () => {
  if(mainTemp.textContent === '--' || mainTemp.content === undefined) return; 

  if(mainTemp.textContent[mainTemp.textContent.length - 1] === 'C') {
    mainTemp.textContent = convertTemperature(parseFloat(mainTemp.textContent), 'fahrenheit');
    minTemp.textContent = convertTemperature(parseFloat(minTemp.textContent), 'fahrenheit');
    maxTemp.textContent = convertTemperature(parseFloat(maxTemp.textContent), 'fahrenheit');
  }
  else {
    mainTemp.textContent = convertTemperature(parseFloat(mainTemp.textContent), 'celsius');
    minTemp.textContent = convertTemperature(parseFloat(minTemp.textContent), 'celsius');
    maxTemp.textContent = convertTemperature(parseFloat(maxTemp.textContent), 'celsius');
  }
});