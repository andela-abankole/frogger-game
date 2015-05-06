var positionArray = [68, 145, 230, 314]; //position of bugs
var speedArray = [100, 250]; //speed values of bugs
var updateX; //new position of player in x coordinates
var updateY; //new position of player in y coordinates

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = -100;
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
     if (this.x > 450) {

       this.x = -10;
       this.y=positionArray[Math.floor(Math.random() * positionArray.length)];
       this.speed = speedArray[Math.floor(Math.random() * speedArray.length)]; 
    }

    else {
       this.x += this.speed * dt;   //multiply any movement by the dt parameter
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
//End of Selector

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  // initial position
  this.x = 0;
  this.y = 390;

    //Array of Characters 
    var sprites = ['images/char-boy.png', 'images/char-pink-girl.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-princess-girl.png'];
    //Goes throught
    this.sprite = sprites[Math.floor(Math.random() * sprites.length)];
    // this.sprite = 'images/char-horn-girl.png';
  }
  //Updates position of player
  Player.prototype.update = function(dt){

  }
  //Draws player on the screen
  Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  Player.prototype.handleInput = function(key){
    // control the movement of player
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
      if(this.y - 85 >= 0){
        this.y = this.y - 85;
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

  var move = document.createElement("audio");
  move.setAttribute('src', 'beats/move.wav');
  move.play();
  }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i =0; i <=4; i++) {
  var enemy = new Enemy();
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
