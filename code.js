//Moves the tortoise and the hare on the page, based on previous assignment

var raceRunning = false;
var animal1type = "Turtle";
var animal2type = "Rabbit";

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
  }
}

function Race(animal1, animal2, bet, choice) {
  this.animal1 = animal1;
  this.animal2 = animal2;
  this.bet = bet;
  this.choice = choice;
  this.totalDistance = 90;
  this.delay = 100;

  this.step = function () {
    this.animal1.move();
    this.animal2.move();
    this.animal1.imageElement.style.left = String(this.animal1.position) + "%";
    this.animal2.imageElement.style.left = String(this.animal2.position) + "%";
  };

  this.determineWinner = function () {
    var winner = "";
    if ((this.animal1.position >= this.totalDistance) &&//Animal1 wins if they cross
        (this.animal2.position < this.totalDistance)) {  //and animal2 doesn't
      winner = "top";
    } else if ((this.animal2.position >= this.totalDistance) &&  //and vice versa
          (this.animal1.position < this.totalDistance)) {
      winner = "bottom";
    } else if ((this.animal2.position >= this.totalDistance) &&  //if it looks like a tie
          (this.animal1.position >= this.totalDistance)) {
      if (this.animal2.position > this.animal1.position) { //figure out who went farther
        winner = "bottom";
      } else if (this.animal1.position > this.animal2.position) {
        winner = "top";
      } else {             //They both went the same distance if we get here
        winner = "TIE"; //This is a flag; we'll use it differently from a name
      }
    }
    return winner;
  };
}

function initializeAnimal(animalValue, divNum) {
  var picID = "pic" + divNum;
  //var imageElement = document.getElementById(picID);
  if (animalValue === "Turtle") {
      $('#' + picID).css({'background-image' : 'url(images/100px-Found_Turtle.png)'});
        return new Animal("Tortoise", 1, 9, picID);
  }
  if (animalValue === "Rabbit") {
      $("#" + picID).css({'background-image' : 'url(images/Rabbit-icon.png)'});
    return new Animal("Hare", 3, 3, picID);
  }
  if (animalValue === "Mouse") {
      $('#' + picID).css({'background-image' : 'url(images/mouse-icon.png)'});
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

var gambler = {
  walletElement: document.getElementById("funds"),
  choiceElements: document.getElementsByName("choice"),
  betElement: document.getElementById("bet")
};


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
    winner = race.determineWinner();
    if (winner === "TIE") {
      invTextElement.textContent = "There was a tie!!!";
      gambler.walletElement.textContent =   //you get your bet back
        Number(gambler.walletElement.textContent) + race.bet;
    } else {
      if (race.choice === winner) { //collect winnings; otherwise wallet is same
        gambler.walletElement.textContent =
          Number(gambler.walletElement.textContent) + 2 * race.bet;
      }
      $('#win').css({"color" : "#F00"})
      if (winner === "top") {
        winner = race.animal1.name;
      } else {
        winner = race.animal2.name;
      }
      $(function(){
          $('#invDiv').css({'display': 'block'});
      });
      invTextElement.textContent = winner + " Wins!!!";
    }
    $(function(){
      $('#invDiv').css({"display" : "block"});
    });
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

  //get input here
  var bet = Number(gambler.betElement.value);
  var i, choice;
  for (i = 0; i < gambler.choiceElements.length; i++) {
    if (gambler.choiceElements[i].checked) {
      choice = gambler.choiceElements[i].value;
      break;
    }
  }

  $('#bet').attr('min', '0');
  $('#bet').attr('max', gambler.walletElement.textContent);

  gambler.walletElement.textContent =
    Number(gambler.walletElement.textContent) - bet;

  var animal1 = initializeAnimal(animal1type, 1);
  var animal2 = initializeAnimal(animal2type, 2);

  var bigRace = new Race(animal1, animal2, bet, choice);

  runRaceInner(bigRace);
}


