var backImage,backgr;
var player, player_running;
var ground,ground_img;
var b1

var END =0;
var PLAY =1;
var gameState = PLAY;
var FoodGroup
var bananaImage
var stoneImg
var stoneGroup
var score=0
var gI,gameo

function preload(){
  backImage=loadImage("Jung.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png")
stoneImg=loadImage("stone.png")
gI=loadImage("gameOver.png")
}

function setup() {
  createCanvas(750,400);
  FoodGroup=new Group;
  stoneGroup=new Group;

  backgr=createSprite(0,200,29999990,400);
  backgr.addImage(backImage);
  backgr.scale=1.12;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  //backgr.width=20
/*
  b1=createSprite(-100,200,20,20)
  b1.addImage(backImage);
  b1.scale = 0.6;
  b1.x = backgr.width / 5;
b1.velocityX=-4*/


  player = createSprite(100,380,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.13;
  
  ground = createSprite(400,390,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameo = createSprite(380, 300, 800, 10);
  gameo.addImage(gI)
  gameo.scale=0.9
  gameo.visible=false
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    
  
  if(backgr.x<206){
    backgr.x=backgr.width/2.5;
   //b1.velocityX=-4
  }
/*
    if (b1.x < -200) {
      b1.x = -50;
      //b1.velocityX=-4
    }*/

    

  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale += 0.05
    }
    spawnFood();
  }
  stone();






  drawSprites();


  if (gameState === END) {

    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    stoneGroup.destroyEach();

    textSize(50);
    fill(255);
    stroke("black")
    strokeWeight(5)
    text("Game Over!", 250, 200);
    gameo.visible=true


  }
if (gameState===PLAY) {


  textSize(15);
  fill(255);
  text("Click 'Space' To Jump And Avoid Obstacles", 30, 30);

}
  textSize(15);
  fill(255);
  text("Score:" + score, 670, 30)

}

function spawnFood() {

  //write code here to spawn the food

  if (frameCount % 90 === 0) {
    var banana = createSprite(900, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana)

}}


function stone() {

  if (frameCount % 120 === 0) {
    var stone = createSprite(900, 360, 40, 10);
    //stone.y = random(120, 200);
    stone.addImage(stoneImg);
    stone.scale = 0.12;
    stone.velocityX = -4;

    stone.lifetime = 300;
    player.depth = stone.depth + 1;
    stoneGroup.add(stone)

  }

  

if (stoneGroup.isTouching(player) ){
gameState = END;
}


}