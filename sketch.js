var fighterplane,fighterplaneimage,asteroid,asteroidimage,space,spaceimage,alien,alienimage;
var restart,restartimage,fighterplanecrashedimage,missile,missileimage,gameover,gameoverimage;
var gameoversound,destroysound,firingsound;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score = 0;
var restart,restartimage;
function preload(){
spaceimage = loadImage("space.png");
fighterplaneimage = loadImage("plane.png");
asteroidimage = loadImage("asteroid.png");
alienimage = loadImage("alien.png");
missileimage = loadImage("missile.png");
fighterplanecrashedimage = loadImage("figterplanecrashedimage.png");
restartimage = loadImage ("restart.png");
gameoverimage = loadImage ("GameOverimage.png");
gameoversound = loadSound ("gameoversound.wav");
destroysound = loadSound ("destroysound.flac");
firingsound = loadSound ("firingsound.wav");
}
function setup() {
  createCanvas(1000,600);
  space=createSprite(0,0,800,400);
  space.addImage(spaceimage);
  space.scale=1.5;
  space.velocityX=-4;

  fighterplane=createSprite(100,200);
  fighterplane.addImage(fighterplaneimage);
  fighterplane.scale=0.5;

  restart = createSprite(500,330);
  restart.addImage(restartimage);

  gameover = createSprite(500,200);
  gameover.addImage(gameoverimage);
  gameover.scale=0.6;
  

 alienGroup = new Group();
 asteroidsGroup = new Group();
 missileGroup = new Group();

}
function draw() { 
  background(0);

  if (gameState===PLAY){
  space.velocityX=-4;
  if(space.x<0){
    space.x=space.width/2;
    }
  
    if(keyDown("up")){
    fighterplane.velocityY=-10;
    }
  
    fighterplane.velocityY = fighterplane.velocityY+0.5

    spawnAlien();
    spawnAsteroids();

    restart.visible = false;
    gameover.visible = false;

    if (keyDown("space")) {
      createMissiles();
      firingsound.play();
    }
    for (var i = 0;i<asteroidsGroup.length ; i++){ 
    if (asteroidsGroup.get(i).isTouching(missileGroup)){
    destroysound.play();
    score=score+1
    missileGroup.destroyEach();
    asteroidsGroup.get(i).destroy();
    }
  }
    for (var j = 0;j<alienGroup.length ; j++){ 

    if (alienGroup.get(j).isTouching(missileGroup)){
    destroysound.play();
    score=score+1
    missileGroup.destroyEach();
    alienGroup.get(j).destroy();
    }
  }

    if (fighterplane.isTouching(alienGroup)){
    fighterplane.addImage(fighterplanecrashedimage);
    gameoversound.play();
    gameState = END;
    }
    if (fighterplane.isTouching(asteroidsGroup)){
    fighterplane.addImage(fighterplanecrashedimage);
    gameoversound.play();
    gameState = END;
    }
    
  }
  else if(gameState===END){
  console.log("OVER");
  alienGroup.destroyEach();
  asteroidsGroup.destroyEach();
  fighterplane.velocityY=0;
  alienGroup.setVelocityXEach(0);
  space.velocityX=0;
  asteroidsGroup.setVelocityXEach(0);
  score = 0;
  restart.visible = true;
  gameover.visible = true;
  if(mousePressedOver(restart)) {
  reset();
  }
  }  

  drawSprites();

  textSize(20);
  fill("red");
  strokeWeight(5);
  stroke("yellow");
  text("SCORE : "+score,850,150);
}

function spawnAlien(){
  if (frameCount%300===0){
  alien=createSprite(800,200,20,20);
  alien.y=Math.round(random(100,600));
  alien.addImage(alienimage);
  alien.velocityX=-4;
  alien.scale=0.3;
  alienGroup.add(alien);
}
}
function spawnAsteroids(){
  if (frameCount%150===0){
  asteroid=createSprite(800,400,20,20);
  asteroid.y=Math.round(random(100,600));
  asteroid.addImage(asteroidimage);
  asteroid.velocityX=-4;
  asteroid.scale=0.3;
  asteroidsGroup.add(asteroid);
}
}
function createMissiles() {
  missile= createSprite(100,100,60,10);
  missile.addImage(missileimage);
  missile.x = 250;
  missile.y= fighterplane.y;
  missile.velocityX = 4;
  missile.scale = 0.2;
  missileGroup.add(missile); 
}
function reset(){
  gameState = PLAY;
  fighterplane.addImage(fighterplaneimage);
  fighterplane.scale=0.5;
  }
