//Moves the tortoise and the hare on the page, based on previous assignment

function Animal(speed, focus, imageID) {
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
  this.delay = 150;

  this.step = function () {
    this.animal1.move();
    this.animal2.move();
    this.animal1.imageElement.style.left = String(this.animal1.position) + "%";
    this.animal2.imageElement.style.left = String(this.animal2.position) + "%";
  };

  this.reset = function () {
    this.animal1.position = 0;
    this.animal2.position = 0;
    this.animal1.imageElement.style.left = String(this.animal1.position) + "%";
    this.animal2.imageElement.style.left = String(this.animal2.position) + "%";
  };
}

function runRace(race) {
  race.step();
  if ((race.animal1.position < race.totalDistance) &&
        (race.animal2.position < race.totalDistance)) {
    setTimeout(function () {runRace(race); }, race.delay);
  }
}

var turtle = new Animal(1, 10, "pic1");
var rabbit = new Animal(3, 3, "pic2");

var bigRace = new Race(rabbit, turtle);
