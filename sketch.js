var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();

  spookySound.loop();
}

function draw() {
  background(200);
  
  if(gameState==="play"){
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }  

  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }  

  if(keyDown("space")){
    ghost.velocityY=-5;
  }  
  ghost.velocityY+=0.8

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  } 

  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
    ghost.destroy();
    gameState="end";
  }

  spawnDoors();

   drawSprites(); 
  }
  if(gameState==="end"){
    textSize(50);
    text("Game Over",200,200);
    stroke ("yellow");
    fill ("yellow");
  }
}

function spawnDoors(){
  if(frameCount%240===0){
  door=createSprite(Math.round(random(100,500)),-50);
  climber=createSprite(200,10);
  invisibleBlock=createSprite(200,15);

  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;

  door.addImage(doorImg);
  climber.addImage(climberImg);

  climber.x=door.x;
  invisibleBlock.x=door.x;

  door.velocityY=1;
  climber.velocityY=1;
  invisibleBlock.velocityY=1;

  door.lifetime=800;
  climber.lifetime=800;
  invisibleBlock.lifetime=800;
  invisibleBlock.debug=true;
  
  ghost.depth=door.depth;
  ghost.depth+=1;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  }
}


