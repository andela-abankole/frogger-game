/**
 * @author akinjide.bankole@andela.co (Akinjide Bankole 2015)
 */
var score = 0; //Score Variable 
var lives = 3; //Life Variable 

//Gets ID score from DOM and adds image with the default score value
document.getElementById('score').innerHTML= "<img src='images/Star.png'>" + score;

//Gets ID score from DOM and adds image with the default life value
document.getElementById('life').innerHTML = "<img src='images/Heart.png'>" + lives;

var positionArray = [68, 145, 230, 314]; //position of bugs
var speedArray = [80, 130, 160, 50, 30]; //speed values of bugs

//Resets the player position
function startover(){
  player.x = 0;
  player.y = 390;       
}

//Player reaching the water
function waterCollisions(){
  document.getElementById('score').innerHTML= "<img src='images/Star.png'>" + score; //pushes the score into the ID score from DOM
  if(player.y === -35){ //Checks if the player has reach the top
    score += 10; //increments the score by 10
    startover(); //Calls startover function

    var winSound = document.createElement("audio");
    winSound.setAttribute("src", "beats/ok.mp3");
    winSound.play();
  }
}

// Enemies our player must avoid
/**
 * An Enemy
 * @constructor
 */
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = -10;
    this.y = positionArray[Math.floor(Math.random() * positionArray.length)]; //selects position randomly 
    this.speed = speedArray[Math.floor(Math.random() * speedArray.length)]; //selects speed randomly 

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      if(this.x > 650) {

         this.x = -100;
         this.y=positionArray[Math.floor(Math.random() * positionArray.length)];
         this.speed = speedArray[Math.floor(Math.random() * speedArray.length)]; 
      }

      else {
         this.x += this.speed * dt + 3;   //multiply any movement by the dt parameter
                                      // which will ensure the game runs at the same speed for
                                      // all computers.
      }
    }

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

// Adds Selector image to the starting position of player
var Position = function(){
    // initial position
    this.x = 0;
    this.y = 375;

    this.sprite = 'images/Selector.png';

}
  //Draws selector on the screen
  Position.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  var position = new Position();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/* Create a new Player
 * @class Represents a player
 */
var Player = function(){
  // initial position
  this.x = 0;
  this.y = 390;

    //Array of Characters 
    var sprites = ['images/char-boy.png', 'images/char-pink-girl.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-princess-girl.png'];

    this.sprite = sprites[Math.floor(Math.random() * sprites.length)];
    // this.sprite = 'images/char-horn-girl.png';
}

  Player.prototype.update = function(dt){

  }
  //Draws player on the screen
  Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  Player.prototype.handleInput = function(key){
    //Controls the movement of player
    if(key === "left"){
      if(this.x - 100 >= 0){
        this.x = this.x - 100;
      }
    }
    else if(key === "right"){
      if(this.x + 100 <= 601){
        this.x = this.x + 100;
      }
    }
    else if(key === "up") {
      if(this.y - 85 >= -50){
        this.y = this.y - 85;
        console.log(player.y)
      }
      else{
        this.x = 0;
        this.y = 390;
      }
    }
    else if(key === "down"){
      if(this.y + 85 <= 400){
        this.y = this.y + 85;
      }
    }
    //Sound for Player movement
    var move = document.createElement("audio");//Creates new Element
    move.setAttribute('src', 'beats/move.wav');//Recieves sound clip from source
    move.play();
  }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
/**
 * the number of bugs
 * @const
 */
var numBug = 4;

/**
 * array of enemies
 */
var allEnemies = [];

// add enemies
// create a group of enemies
for(var i = 0; i < numBug; i++){
  var enemy = new Enemy();
  // add the enemy to array
  allEnemies.push(enemy);
}

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions(enemy, player) {
  document.getElementById('life').innerHTML= "<img src='images/Heart.png'>" + lives; //pushes the score into the ID score from DOM  
    for(var i in enemy) {
        if((player.x - enemy[i].x < 50 && player.y - enemy[i].y < 50) && (player.x - enemy[i].x > -50 && player.y - enemy[i].y > -50)) {
           startover();
           if(lives > 0){
              lives--;
            }              
            else {
              document.getElementById('game').innerHTML= "GAME OVER, YOUR SCORE IS: " + score; 
              lives = 3;
              score = 0;
            }
        var collisionSound = document.createElement("audio");
        collisionSound.setAttribute("src", "beats/reset.wav");
        collisionSound.play();
        }
    }
}