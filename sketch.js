const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var death = 0;
var gameState = 1;

function preload(){
  injecttionImg=loadImage("injection.png")
  house=loadImage('house.png')
  bg=loadAnimation('bg/bg1.gif','bg/bg2.gif','bg/bg3.gif','bg/bg3.gif','bg/bg4.gif','bg/bg6.gif','bg/bg7.gif')
  virus1=loadAnimation("virus/v1.gif","virus/v3.gif","virus/v4.gif","virus/v5.gif","virus/v6.gif","virus/v7.gif","virus/v8.gif","virus/v9.gif")
  helicoper=loadAnimation("helicopter/h1.gif","helicopter/h2.gif","helicopter/h3.gif","helicopter/h4.gif","helicopter/h5.gif","helicopter/h6.gif","helicopter/h7.gif","helicopter/h8.gif")
  jumpingAnimation = loadAnimation(
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump00.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump01.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump02.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump03.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump04.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump05.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump06.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump07.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump08.png',     
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/jump09.png'    
  );
  runningAnimation = loadAnimation( 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run01.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run02.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run03.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/Run04.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run05.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run06.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run07.png', 
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run08.png',     
    'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureMan/run09.png'    
  );
  medicine = loadImage('medicine.png');
  over=loadImage('over.png');
  win=loadImage('won.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  engine = Engine.create();
	world = engine.world; 
  virusGroup = new Group();
  injectionGroup = new Group();
  
  bgSprite=createSprite(windowWidth/2,windowHeight/2)
  bgSprite.addAnimation("bg",bg);
  bgSprite.scale = 1.7;
  bgSprite.frameDelay = 10;

  message=createSprite(windowWidth/2,windowHeight/2)
  message.visible=false

  ground=createSprite(windowWidth/2,windowHeight,windowWidth,20)
  ground.visible=false
  ground = new Ground(windowWidth/2,windowHeight,windowWidth,20)
  
  warrior = new Player(50,windowHeight-50,50,50)

  warrior1=createSprite(50,windowHeight-50,50,50);
  warrior1.addAnimation('run',runningAnimation);
  warrior1.scale=2;
  
  heli = new Heli(windowWidth/2,100,100,100)
  
  helicoperSprite=createSprite(windowWidth/2,100,100,100);
  helicoperSprite.addAnimation('heli',helicoper)
  helicoperSprite.scale=2;

  location1 = createSprite((windowWidth-200),windowHeight-150,100,100)
  location1.addImage(house)
  location1.scale=0.4

  medicineSprite=createSprite(warrior1.x,warrior1.y,20,20)
  medicineSprite.addImage(medicine)
  medicineSprite.scale=0.1
 medicineSprite.depth=1;
  location1.depth=1;
  var options={
    bodyA:heli.body,
    bodyB:warrior.body,
    length:10,
    stiffness:0.4
  }
  //console.log(options);
  rope=Constraint.create(options)
  World.add(world,rope)
  console.log(rope)
}

function draw() {
  background(255,255,255);  
  Engine.update(engine)
  if(gameState===1){
    spawnVirus();
    medicineSprite.x=warrior1.x+20;
    medicineSprite.y=warrior1.y+15;
    if(keyDown('space')){
      warrior1.velocityY=-5;
      warrior.body.velocity.y=-5
      console.log(warrior)
    }
    if(medicineSprite.isTouching(location1)){
      medicineSprite.x=location1.x-100;
      medicineSprite.y=location1.y+130;
      gameState=2;
    }
    if(injectionGroup.isTouching(virusGroup)){
      virusGroup.destroyEach();
      injectionGroup.destroyEach();
      death = death-1
    }
    if(warrior1.isTouching(virusGroup)){
      gameState =0;
    }
    if(virusGroup.isTouching(location1)){
      death = death+1
      virusGroup.destroyEach();
    }
    if(death>=5){
      gameState = 0;
    }
    //warrior1.velocityY+=0.5;
    //warrior.body.velocity.y +=0.5
    warrior1.x=warrior.body.position.x
    warrior1.y=warrior.body.position.y
    helicoperSprite.x=heli.body.position.x
    helicoperSprite.y=heli.body.position.y
  }
  else if(gameState===0){
    virusGroup.setVelocityXEach(0);
    message.visible=true;
    message.addImage(over)

  }
  else if(gameState===2){
    virusGroup.setVelocityXEach(0);
    message.visible=true;
    message.addImage(win)

  }
  warrior.display()
  warrior1.debug=false
  heli.display()
  ground.display()
  drawSprites();
  textSize(30)
  fill("white")
  text('death: '+death,windowWidth-150,50)
}

function keyPressed(){
  if(keyCode==39){
    warrior1.x += 2;
    warrior.body.position.x += 2;
  }
  if(keyCode==38){
    warrior1.y += -2;
    warrior.body.position.y += -2;
  }
  if(keyCode==37){
    warrior1.x += -2;
    warrior.body.position.x += -2;
  }
  if(keyCode==40){
    warrior1.y += 10;
    warrior.body.position.y += 10;
  }
  if(keyCode== 69){
     rope.bodyB=null
  }
  if(keyCode== 68){
    rope.bodyB=warrior.body
  }
  if(keyCode== 73){
    spawnInjection();
  }

}
function spawnVirus() {
 rand = Math.round(random(1,5))
 rand1 = Math.round(random(1,2))
 switch(rand){
   case 1: fc=50;
   break;
   case 2: fc=75;
   break;
   case 3: fc=100;
   break;
   case 4: fc=150;
   break;
   case 5: fc=200;
   break;
 }
  if (frameCount % fc === 0) {
    var virus = createSprite(displayWidth,120,40,10);
    virus.y = Math.round(random(400,windowHeight-100));
    virus.addAnimation('virus1',virus1);
    virus.scale = 0.25;
    if(rand1===1){
      virus.x=displayWidth;
      virus.velocityX = -6
    }
    else if(rand1===2){
      virus.x=0;
      virus.velocityX = 6
    }
    virus.setCollider('circle',0,0,100)
    //virus.velocityY= -Math.round(random(-5,2));
    virus.lifetime = displayWidth;
    virus.depth = warrior1.depth;
    warrior.depth = warrior1.depth + 1;
    virusGroup.add(virus);
    virus.debug=false
  }
}

function spawnInjection() {
 var virus = createSprite(displayWidth,120,40,10);
     virus.x = warrior1.x
     virus.y = warrior1.y
     virus.addImage(injecttionImg)
     virus.scale = 0.1;
     virus.lifetime = displayWidth;
     virus.depth = warrior1.depth;
     warrior.depth = warrior1.depth + 1;
     injectionGroup.add(virus);
     virus.velocityX=3;
     virus.velocityY=4;
   
 }
 //gameState0 = end
 //gameState1 = play
 //gameState2 = win
 //gamestate4 = start