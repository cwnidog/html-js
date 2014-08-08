//Moves the tortoise and the hare on the page, based on previous assignment

var raceRunning = false;

function Animal(name, speed, focus, imageID) {
  this.name = name;
  this.speed = speed; //distance moved per step
  this.focus = focus; //scale of 0 to 10, probability of moving in a given step
  this.imageElement = document.getElementById(imageID);
  this.imageElement.style.position = "relative";
  this.position = 0;
  this.move = function () { //Makes a move
    if (Math.random() * 10 < this.focus) {//for focus = 8, moves 80% of the time
      this.position += speed;
    }
  };
}

function Race(animal1, animal2) {
  this.animal1 = animal1;
  this.animal2 = animal2;
  this.totalDistance = 90;
  this.delay = 100;

  this.step = function () {
    this.animal1.move();
    this.animal2.move();
    this.animal1.imageElement.style.left = String(this.animal1.position) + "%";
    this.animal2.imageElement.style.left = String(this.animal2.position) + "%";
  };
}

function initializeAnimal(animalValue, divNum) {
  var picID = "pic" + divNum;
  var imageElement = document.getElementById(picID);
  if (animalValue === "turtle") {
    imageElement.style.backgroundImage = "url(images/100px-Found_Turtle.png)";
    return new Animal("Tortoise", 1, 9, picID);
  }
  if (animalValue === "rabbit") {
    imageElement.style.backgroundImage = "url(images/Rabbit-icon.png)";
    return new Animal("Hare", 3, 3, picID);
  }
  if (animalValue === "mouse") {
    imageElement.style.backgroundImage = "url(images/mouse-icon.png)";
    return new Animal("Mouse", 8, 1, picID);
  }
}

function reset() {
  if (!raceRunning) {
    var invElement = document.getElementById("invDiv");
    var pic1 = document.getElementById("pic1");
    var pic2 = document.getElementById("pic2");
    pic1.style.left = "0%";
    pic2.style.left = "0%";
    invElement.style.display = "none";
  }
}

function runRaceInner(race) {
  race.step();
  var invElement = document.getElementById("invDiv");
  var invTextElement = document.getElementById("win");

  var winner = "";

  if ((race.animal1.position < race.totalDistance) &&
        (race.animal2.position < race.totalDistance)) {
    setTimeout(function () {runRaceInner(race); }, race.delay);
  } else {
    raceRunning = false;          //the race is over, figure out who wins
    if ((race.animal1.position >= race.totalDistance) &&//Animal1 wins if they cross
        (race.animal2.position < race.totalDistance)) {  //and animal2 doesn't
      winner = race.animal1.name;
    } else if ((race.animal2.position >= race.totalDistance) &&  //and vice versa
          (race.animal1.position < race.totalDistance)) {
      winner = race.animal2.name;
    } else if ((race.animal2.position >= race.totalDistance) &&  //if it looks like a tie
          (race.animal1.position >= race.totalDistance)) {
      if (race.animal2.position > race.animal1.position) { //figure out who went farther
        winner = race.animal2.name;
      } else if (race.animal1.position > race.animal2.position) {
        winner = race.animal1.name;
      } else {             //They both went the same distance if we get here
        winner = "TIE"; //This is a flag; we'll use it differently from a name
      }
    }//we now know the winner for sure.
    if (winner === "TIE") {
      invTextElement.textContent = "There was a tie!!!";
    } else {
      invTextElement.textContent = winner + " Wins!!!";
    }
    invElement.style.display = "block";
  }
}

function runRace() {
  if (raceRunning) {
    return;
  }//I only want to run if there is no race, but don't
   //want to put everything in an if loop
  reset();
  raceRunning = true;

  //get input here.
  var animal1type = "turtle";
  var animal2type = "mouse";

  var animal1 = initializeAnimal(animal1type, 1);
  var animal2 = initializeAnimal(animal2type, 2);

  var bigRace = new Race(animal1, animal2);

  runRaceInner(bigRace);
}


