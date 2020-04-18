//For time
const displayTime = document.querySelector("#time"); //Get the time display
let displayAmOrPm = true; //Check whether to display 12 or 24 hr format
//For greeting
const greetingPerson = document.querySelector('#greeting-person');
//For message
const messageContent = document.querySelector('#message-content');

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
    //If AM
    if(hours < 12) {
      displayTime.textContent = `${hours % 12}:${parseZero(minutes)}:${parseZero(seconds)} AM`;
    }
    //Or PM
    else {
      displayTime.textContent = `${hours % 12}:${parseZero(minutes)}:${parseZero(seconds)} PM`;
    } 
  }
  //Display 24 hour
  else {
    displayTime.textContent = `${hours}:${parseZero(minutes)}:${parseZero(seconds)}`;
  }

  //Make the clock run automatically
  setInterval(changeTime, 1000);
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
    wallpaper.style.backgroundPosition = '0 0';
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
  if(localStorage.getItem('name') === null) return;
  greetingPerson.textContent = localStorage.getItem('name').toString();
}

//Check if a message exists
const doesMessageExists = () => {
  if(localStorage.getItem('message') === null) return;
  messageContent.textContent = localStorage.getItem('message').toString();
}

changeTime();
doesNameExists();
doesMessageExists();

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
    localStorage.setItem('name', greetingPerson.textContent);
    greetingPerson.blur();
  }
});

//When a user clicks out of the text
greetingPerson.addEventListener('blur', () => {
  localStorage.setItem('name', greetingPerson.textContent);
})

//When a user clicks enter in message box
messageContent.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    localStorage.setItem('message', messageContent.textContent);
    messageContent.blur();
  }
});

//When a user clicks out of the message box
messageContent.addEventListener('blur', () => {
  localStorage.setItem('message', messageContent.textContent);
});

const todoLogo = document.querySelector('.todo-icon-container');
const todoClose = document.querySelector('#todo-close');
const todoNavbar = document.querySelector('.todo-list-container');

todoLogo.addEventListener('click', () => {
  todoNavbar.style.right = '0';
})

todoClose.addEventListener('click', () => {
  todoNavbar.style.right = '-300px';
})