// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
  }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Selector
var Position = function(){
  this.x = 605;
  this.y = 375;

  this.sprite = 'images/Selector.png';

}

Position.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var position = new Position();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.x = 601;
  this.y = 400;

    //Array of Characters 
    var sprites = ['images/char-boy.png', 'images/char-pink-girl.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-princess-girl.png'];
    //Goes throught
    this.sprite = sprites[Math.floor(Math.random() * sprites.length)];
    // this.sprite = 'images/char-horn-girl.png';
  }

  Player.prototype.update = function(dt){

  }

  Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  Player.prototype.handleInput = function(key){
    if(key === "left"){
      if(this.x - 100 >= 1){
        this.x = this.x - 100;
      }
    }
    else if(key === "right"){
      if(this.x + 100 <= 601){
        this.x = this.x + 100;
      }
    }
    else if(key === "up") {
      if(this.y - 85 >= 60){
        this.y = this.y - 85;
      }
      else{
        this.x = 201;
        this.y = 400;
      }
    }
    else if(key === "down"){
      if(this.y + 85 <= 400){
        this.y = this.y + 85;
      }
    }
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
