var ground, groundImage, stoneImage, obstacleGroup, gameover, gameoverImage
var player, playerImage, stone, enemyGroup, bomb, bombImage, visibleGround
var gameState = 0 ;


function preload(){
  playerImage = loadImage("ghost image.png");
  groundImage = loadImage("download.png");
  stoneImage = loadImage("stone1.jpg");
  bombImage = loadImage("Bomb1.png");
  gameoverImage = loadImage("gameover1.png")
  
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database;
  player = createSprite(100, 380, 10, 10);
  player.addImage(playerImage);
  player.scale = 0.1;
  
  ground = createSprite(200, 230, 100, 500);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  ground.scale = 5;
  
  gameover = createSprite(220, 200, 100, 50);
  gameover.scale = 2.4
  gameover.visible = false;
  
  obstacleGroup = createGroup();
  enemyGroup = createGroup();
  
  
}

function draw() {

  player.y = World.mouseY
  ground.velocityX = -3 
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
    if(gameState === 1){
      clear();
      game.play();
    }
    if(gameState === 2){
      game.end();
    }
  
  
  if(enemyGroup.isTouching(player)){
    bomb.visible = false;
    stone.visible = false;
    gameover.depth = bomb.depth;
    gameover.depth = gameover.depth + 1;
    
    gameover.depth = stone.depth;
    gameover.depth = gameover.depth + 1;
  
    gameover.addImage(gameoverImage)
    stone.velocityX=0;
    bomb.velocityX=0;
    ground.velocityX = -2;
    gameover.visible = true;
    
    player.velocityY = player.velocityY + 0;
    

     }
  
  if(obstacleGroup.isTouching(player)){
     gameover.depth = bomb.depth;
    gameover.depth = gameover.depth + 1;
    
    gameover.depth = stone.depth;
    gameover.depth = gameover.depth + 1;
    gameover.addImage(gameoverImage);
    bomb.velocityX = 0;
    stone.velocityX = 0;
    ground.velocityX = 0;
    gameover.visible = true;
    bomb.visible = false;
    stone.visible = false;    
  
  
     }
  
  player.depth = ground.depth;
  player.depth = player.depth + 1;
     
  drawSprites();
  spawnobstacle();
  spawnenemy();
}



function spawnobstacle(){
  if(frameCount % 100 === 0){
    stone = createSprite(500, 380, 10, 10);
    stone.addImage(stoneImage);
    stone.velocityX = -4;
    stone.lifetime = 200;
    stone.scale = 0.4;
     obstacleGroup.add(stone);
     }
}

function spawnenemy(){
  if(frameCount % 150 === 0){
    bomb = createSprite(500, 200, 10, 10)
    bomb.addImage(bombImage);
    bomb.y = Math.round(random(10, 370))
    bomb.scale = 0.3
    bomb.velocityX = -4
    bomb.lifetime = 500;
    
    enemyGroup.add(bomb);
  }
}


