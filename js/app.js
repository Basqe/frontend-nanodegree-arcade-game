// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed = 1){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      this.x += 50 * this.speed * dt;
      // checks collisions and takes action after it occurs
      if (this.x + 65 >= player.x && this.x <= player.x + 50 && this.y === player.y){
        player.lives--;
        player.softReset();
        if(player.lives == 0){
          alert('Oh dear, you are dead.');
          player.reset();
        }
      }
  };

  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
    this.score = 0;
    this.lives = 3;
  };

  update(){
    if(this.y < 10) {
      this.score++;
      player.softReset();
      if(this.score == 10){
        alert('You won, congratulations!')
        player.reset();
      }
    }
  };

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput(e){
    switch(e){
      case 'up':
        if (this.y > 0) this.y -= 80;
        break;
      case 'down':
        if (this.y < 380) this.y += 80;
        break;
      case 'left':
        if (this.x > 0) this.x -= 101;
        break;
      case 'right':
        if (this.x < 400) this.x += 101;
        break;
    }
  };

  softReset(){
    this.x = 200;
    this.y = 380;
  };

  reset(){
    this.x = 200;
    this.y = 380;
    this.score =  0;
    this.lives = 3;
  };
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies=[new Enemy(-100, 60, 15), new Enemy(-100, 140, 20), new Enemy(-80, 220, 10)];

// variable that holds possible X-axis positions on board
const columns = [-100, -200, -300, -400];
let enemyX;
// variable that holds possible Y-axis positions on board
const rows = [60, 140, 220];
let enemyY;
// variable that holds speed value
let enemySpeed;

// random locations & speed for bugs
setInterval(function instances(){
    enemyX = columns[Math.floor(Math.random() * 4)],
    enemyY = rows[Math.floor(Math.random() * 3)],
    enemySpeed = Math.floor(Math.random() * 12),
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
},650)

// Place the player object in a variable called player
const player = new Player(200, 380);

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
