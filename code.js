var p1div = document.getElementById("pic1");
var p2div = document.getElementById("pic2");

p1div.style.position = "relative";
p2div.style.position = "relative";


function Animal(name, speed, focus) {
  this.name = name;
  this.speed= speed; //distance moved per step
  this.focus= focus; //scale of 0 to 10, probability of moving in a given step
  this.position = 0;
  this.move = function() { //Makes a move
    if (Math.random()*10 < this.focus) {//for focus = 8, moves 80% of the time
      this.position+=speed;
    }
  }
}


function Race(animal1,animal2) {
  this.animal1 = animal1;
  this.animal2 = animal2;
  this.totalDistance = 90;

  this.run = function () {
    do { //when somebody wins, we return, which kills the loop.
      this.animal1.move();
      this.animal2.move();
      p1div.style.left = String(this.animal1.position) + "%";
      p2div.style.left = String(this.animal2.position) + "%";
    }
    while ((animal1.position<this.totalDistance)&&
          (animal2.position<this.totalDistance));
  };
}

var rabbit = new Animal("Peter",3,3); //relative speed is just the product, 9
var turtle = new Animal("Beth", 1, 10);//rel. speed is 10, should always win
                                      //(except sometimes short races)

var bigRace = new Race(rabbit, turtle);


