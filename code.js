//Moves the tortoise and the hare on the page, based on previous assignment

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

var raceRunning = false;

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

  this.reset = function () {
    if (!raceRunning) {
      var invElement = document.getElementById("invDiv");
      this.animal1.position = 0;
      this.animal2.position = 0;
      this.animal1.imageElement.style.left = String(this.animal1.position) + "%";
      this.animal2.imageElement.style.left = String(this.animal2.position) + "%";
      invElement.style.display = "none";
    }
  };
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

function runRace(race) {
  if (!raceRunning) {
    raceRunning = true;
    runRaceInner(race);
  }
}

var turtle = new Animal("Tortoise", 1, 9, "pic1");
var rabbit = new Animal("Hare", 3, 3, "pic2");

var bigRace = new Race(rabbit, turtle);
