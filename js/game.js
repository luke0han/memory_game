let lights = [];
let userLights = [];
let flash;
let counter;
let good;
let compTurn;
let intervalId;
/*let strict = false;*/
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#counter");
const c = document.querySelector("#c");
const o = document.querySelector("#o");
const d = document.querySelector("#d");
const e = document.querySelector("#e");
/*const strictButton = document.querySelector("#strict"); */
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

/*
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});
*/

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "0";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  lights = [];
  userLights = [];
  flash = 0;
  intervalId = 0;
  counter = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    lights.push(Math.floor(Math.random() * 4) + 1);
  }
  
  console.log(lights);
  compTurn = true;

  intervalId = setInterval(gameTurn, 700);
}

function gameTurn() {
  on = false;

  if (flash == counter) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (lights[flash] == 1) one();
      if (lights[flash] == 2) two();
      if (lights[flash] == 3) three();
      if (lights[flash] == 4) four();
      flash++;
    }, 300);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  c.style.backgroundColor = "#f2a257";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  o.style.backgroundColor = "#f2a257";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  d.style.backgroundColor = "#f2a257";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  e.style.backgroundColor = "#f2a257";
}

function clearColor() {
  c.style.backgroundColor = "#ff6200";
  o.style.backgroundColor = "#ff6200";
  d.style.backgroundColor = "#ff6200";
  e.style.backgroundColor = "#ff6200";
}

function flashColor() {
  c.style.backgroundColor = "#f2a257";
  o.style.backgroundColor = "#f2a257";
  d.style.backgroundColor = "#f2a257";
  e.style.backgroundColor = "#f2a257";
}

c.addEventListener('click', (event) => {
  if (on) {
    userLights.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

o.addEventListener('click', (event) => {
  if (on) {
    userLights.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

d.addEventListener('click', (event) => {
  if (on) {
    userLights.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

e.addEventListener('click', (event) => {
  if (on) {
    userLights.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 700);
    }
  }
})

function check() {
  if (userLights[userLights.length - 1] !== lights[userLights.length - 1])
    good = false;

  if (userLights.length == 15 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "Wrong!";
 
    setTimeout(() => {
      turnCounter.innerHTML = counter;
      clearColor();

      if (good) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        userLights = [];
        good = true;
        intervalId = setInterval(gameTurn, 700);
      }
    }, 700);

    noise = false;
  }

  if (counter == userLights.length && good && !win) {
    counter++;
    userLights = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = counter;
    intervalId = setInterval(gameTurn, 700);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "Congrats!";
  on = false;
  win = true;
  alert('CONGRATS!').ok;
}





