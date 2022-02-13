//O jogo simplesmente não quer funcionar
var dog,boy;
var dogImg,boyImg;

var groundStreet;
var groundStreetImg;

var cone;
var coneImg;
var coneGroup;

var invisibleUp,invisibleDown;

var gameState = PLAY;
var END =0;
var PLAY =1;

var gameOver, restart;

function preload(){
dogImg = loadImage("Dog_Running.png");
boyImg = loadImage("Boy_Running.png");
groundStreetImg = loadImage("Street.png")
coneImg = loadImage("cone.png")

}

function setup() {

  createCanvas(600,300);

  dog = createSprite(75,150);
  dog.addImage("dog",dogImg);
  dog.scale = 0.125;

  boy = createSprite(325,150);
  boy.addImage("boy",boyImg);
  boy.scale = 0.1;

  coneGroup = new Group();
  cone = createSprite(600,150);
  cone.addImage("cone",coneImg);
  cone.scale = 0.1;
  cone.velocityX = -5;

  groundStreet = createSprite(300,150);
  groundStreet.addImage("groundStreet",groundStreetImg);
  groundStreet.scale = 0.2;
  
  invisibleUp = createSprite(600,000);
  invisibleUp.width = 1200;
  invisibleUp.height = 50;
  invisibleUp.visible = false;

  invisibleDown = createSprite(600,300);
  invisibleDown.width = 1200;
  invisibleDown.height = 50;
  invisibleDown.visible = false;

}

function draw() {

  if(gameState === PLAY){
  if(keyDown("up_arrow")){
    boy.velocityY = boy.velocityY + -1;
  }

if(keyDown("down_arrow")){
  boy.velocityY = boy.velocityY + 1;
} 

  dog.y = boy.y;
  dog.depth = groundStreet.depth + 1;
  boy.depth = groundStreet.depth + 1;
  cone.depth = groundStreet.depth + 1;
  boy.depth = cone.depth + 1;
  
  boy.collide(invisibleUp);
  boy.collide(invisibleDown);

  coneSpawn();

  if(coneGroup.isTouching(boy)){
  gameState = end;

  }

  drawSprites();
  }
  
  if(gameState === END){
  coneGroup.destroyEach();
  boy.velocityX = 0;
  textSize(30);
  text("GameOver",230,250);
  
  }
}
function coneSpawn(){
  if(frameCount % 60 === 0){
    cone = createSprite(150,75);
    cone.addImage(coneImg);
    cone.y = Math.round(random(600,300));
    cone.velocityX = -5;
    cone.lifetime = 800;
    coneGroup.add(cone);
  }
}