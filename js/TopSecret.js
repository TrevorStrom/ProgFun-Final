// Create game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update});

// Global variables
var player;
var cursors;
var bullets;
var bulletTime = 5 ;
var fireButton;
var platforms;
var score = 0;
var scoreText;
var bullet;

// Tell the player how to play
alert('Hello you are holding in your hands some of the most well keep secrets our species have ever know.\nPlease get thoses secrets safely to the White House and dont let the aliens get to you first.\n If they catch you then our whole planet is doomed  \nSpacebar is to shoot and you move with the arrow keys');

function preload() {
  game.load.image('sky' , 'assets/sky.png');
  game.load.spritesheet('player', 'assets/dude.png');
  game.load.image('bullet', 'assets/bullet.png');
  game.load.image('ground', 'assets/Ground.png');
  game.load.image('smallPlatform', 'assets/Platform.png');
  game.load.image('largePlatform', 'assets/LargePlatform.png');
  game.load.image('wall', 'assets/wall.png');
  game.load.image('alien', 'assets/Alien.png');
  game.load.image('WhiteHouse', 'assets/WhiteHouse.png');
  game.load.image('UFO', 'assets/ufo.png');
  game.load.image('greenWall', 'assets/greenPlatformWall.png');

}

function create() {

  // Add physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // resize map
  game.world.resize(4500, 600);
  
  game.add.sprite(0,0, 'sky');
  
  //Platforms is now a group
  platforms = game.add.group();

  platforms.enableBody = true;
  
  createPlatforms();

  // Player
  player = game.add.sprite(-60 , 400,'player');
  
  //Enable physics on player
  game.physics.arcade.enable(player);
  
  player.body.bounce.y = 0.08;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  
  // Have camera follow player
  game.camera.follow(player);
  
  // Bullets
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(5, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
  
  // Fire bullet with space bar
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
  // alien enemies
  aliens = game.add.group();
  
  aliens.enableBody = true;
  
  aliens.physicsBodyType = Phaser.Physics.ARCADE;
  
  game.physics.arcade.enable(aliens);
  
  createAliens();
  
  // White House
  whiteHouse = game.add.sprite(4100, 350, 'WhiteHouse')
  
  whiteHouse.enableBody = true;
  
  game.physics.arcade.enable(whiteHouse);
  

  //score
  scoreText = game.add.text( 16, 16, 'Score: 0', { fontSize: '28px', fill: '#FFF'});
  
  
}

function update() {

  // collision detection
  game.physics.arcade.collide(player, platforms);
  
  game.physics.arcade.collide(aliens, platforms);
  
  game.physics.arcade.overlap(bullets, aliens, killAlien, null, this);

  game.physics.arcade.overlap(aliens, player, resetGame, null, this);
  
  game.physics.arcade.overlap(player, whiteHouse, winGame, null, this);
  
  cursors = game.input.keyboard.createCursorKeys();
  
  player.body.velocity.x = 0;
  
  // controls
  if(cursors.left.isDown) {
    player.body.velocity.x = -200;
  }
  if(cursors.right.isDown) {
    player.body.velocity.x = +200;
  }
  if(cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }
  if(fireButton.isDown) {
    fireBullet();
  }
  
}
  // end of update function

function createAliens() {
  // Create alien and movments
  alien = aliens.create(400, 290, 'alien');
  
  alienArrives = game.add.tween(alien);
  
  alienArrives.to({x:600}, 3000).to({x:400}, 3000).loop();
  alienArrives.start();

  //Create second alien
  alien2 = aliens.create(800, 290, 'alien');
  
  secondAlienArrives = game.add.tween(alien2);
  
  secondAlienArrives.to({x: 1000, y: 290}, 2000).to({x: 800, y: 290}, 3000).loop();
  secondAlienArrives.start();
    
  alien3 = aliens.create(800, 500, 'alien');
    
  thirdAlienArrives = game.add.tween(alien3);
    
  thirdAlienArrives.to({x: 1400, y: 500}, 1500).to({x: 800, y: 500}, 1500).loop();
  thirdAlienArrives.start();
    
  alien4 = aliens.create(1620, 230, 'alien');
    
  forthAlienArrives = game.add.tween(alien4);
    
  forthAlienArrives.to({x: 1500, y: 230}).to({x: 1620, y: 230}).loop();
  forthAlienArrives.start();
    
  alien5 = aliens.create(2300, 185, 'alien');
    
  fifthAlienArrives = game.add.tween(alien5);
    
  fifthAlienArrives.to({x: 1900, y: 185}, 3000).to({x: 2300, y: 185}, 3000).loop();
  fifthAlienArrives.start();
    
  alien6 = aliens.create(2850, 185, 'alien');
    
  sixthAlienArrives = game.add.tween(alien6);
    
  sixthAlienArrives.to({x: 2700, y: 185}, 3000).to({x: 2850, y: 185}, 3000).loop();
  sixthAlienArrives.start();
    
  alien7 = aliens.create(2500, 500, 'alien');
    
  seventhAlienArrives = game.add.tween(alien7);
  seventhAlienArrives.to({x: 1900, y: 500}, 2500).to({x: 2500, y: 500}, 2500).loop();
  seventhAlienArrives.start();
    
    // create ufo
  UFO = aliens.create(6000, 30, 'UFO');
    
  movingUFO = game.add.tween(UFO);
    
  movingUFO.to({x: 100, y: 30}, 35000).to({x: 5000, y: 30}, 35000).loop();
  movingUFO.start();
}

function createPlatforms() {
    
  // Variable
  var ground;
  var wall;
  var ledge;
  
  //Create Ground
  ground = platforms.create(0, game.world.height- 50, 'ground');
  
  ground.body.immovable = true;
  
  // Wall
  wall = platforms.create(1500, 300, 'greenWall');
  
  wall.body.immovable = true;
  
  // ledge create
  ledge = platforms.create(350, 350, 'largePlatform');
  
  ledge.body.immovable = true;
  
  ledge = platforms.create(1500, 300, 'smallPlatform');
  
  ledge.body.immovable = true;
  
  // Ledge falling
  ledge = platforms.create(1650, 250, 'smallPlatform');
    
  greenPlatformWall = platforms.create(2900, 0, 'greenWall');
    
  greenPlatformWall.body.immovable = true;
    
  ledge = platforms.create(2700, 250, 'smallPlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(1850, 250, 'largePlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3900, 250, 'greenWall');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3700, 250, 'smallPlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3600, 300, 'smallPlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3500, 350, 'smallPlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3400, 400, 'smallPlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3300, 450, 'smallPlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3200, 500, 'smallPlatform');
    
  ledge.body.immovable = true;
    
  ledge = platforms.create(3100, 550, 'smallPlatform');
    
  ledge.body.immovable = true;
}
  
  // Fire function
function fireBullet() {
  if(game.time.now > bulletTime){
    bullet = bullets.getFirstExists(false);
      
    if(bullet) {
      bullet.reset(player.x + 30,player.y + 30);
      bullet.body.velocity.x = 400;
      bulletTime = game.time.now + 1000;
    }
  }

}

function killAlien (bullets, alien) {
  alien.kill();
  bullets.kill();
  
  score += 100;
  scoreText.text = 'Score: ' + score;
}
  
function resetGame(player, aliens) {
  var restart;
  var upperRestart;
    
  restart = prompt("You failed you country and the world. Would you like a chance to clear your name?(yes/no)");
  upperRestart = restart.toUpperCase();
    
  if(upperRestart === "YES") {
    location.reload();
  }else {
    alert("Thanks for playing");
    window.open('ThanksForPlaying.html');
  }
}
  
function winGame(whiteHouse, player) {
  var restart;
  var upperRestart;
    
  restart = prompt("Congratulations you have protected our species from falling under the aliens control. Would you like to help one more time?(yes/no)");
   upperRestart = restart.toUpperCase();
    
  if(upperRestart === "YES") {
    location.reload();
  }else {
    alert("Thanks for playing")
    window.open('ThanksForPlaying.html');
  }
}