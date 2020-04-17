const displayTime = document.querySelector(".text-display h2"); //Get the time display
let displayAmOrPm = true; //Check whether to display 12 or 24 hr format

//Parse zero whenever the time is in one digit (except hours)
const parseZero = (time) => (time < 10 ? "0" + time : time);

//Display the time
const changeTime = () => {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  //readLine('nice');
  changeWallpaper(hours);

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
  const wallpaper = document.querySelectorAll('.wallpaper');
  const active = document.querySelector('.active');

  if(hours >= 5 && hours < 8) {
    active.classList.remove('active');
    wallpaper[3].classList.add('active');
  }
  else if(hours >= 8 && hours < 17) {
    active.classList.remove('active');
    wallpaper[0].classList.add('active');
  }
  else if(hours >= 17 && hours < 19) {
    active.classList.remove('active');
    wallpaper[2].classList.add('active');
  }
  else {
    active.classList.remove('active');
    wallpaper[1].classList.add('active');
  }
}

changeTime();

//Toggle when the user wants 12 or 24 hour format
displayTime.addEventListener('click', () => {
  if(displayAmOrPm === true) displayAmOrPm = false;
  else displayAmOrPm = true;
});