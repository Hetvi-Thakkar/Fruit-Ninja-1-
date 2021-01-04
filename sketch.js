var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword,fruit ,fruitGroup,enemyGroup, score;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var monster,alien1,alien2;
var cutSound,gameOverSound;

function preload(){
  swordImage = loadImage("sword.png");
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
  alien1 = loadImage("alien1.png")
  alien2 = loadImage("alien2.png");
 gameOverImage = loadImage("gameover.png");
  cutSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}


function setup() {
  createCanvas(400, 400);
  
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
   
  sword.setCollider("rectangle",0,0,40,40);
  
  

  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw(){
  background("lightblue");
  
  if(gameState===PLAY){
    
    
    fruits();
    Enemy();
    
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
      sword.scale = 0.5;
  
    
   if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
       cutSound.play();
      score=score+2;
   }
   // if(score == 10){
    //monster.velocityX = -20;
    //}
     if(enemyGroup.isTouching(sword)){
        gameState=END;
       enemyGroup.destroyEach();
       gameOverSound.play();
    }
  }
    
      // Go to end state if sword touching enemy
      else if(gameState === END){
        
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
       // fruitGroup.setVelocityXEach(0);
        //enemyGroup.setVelocityXEach(0);
        
        sword.x=200;
        sword.y=200;
        sword.addImage(gameOverImage);
      
      }
    
  
  
  drawSprites();
  fill("black");
  textSize(20);
  text("Score : "+ score,300,30);
}

function Enemy(){
 //monsters will be created after 200 frames.
  if(frameCount%200===0)
  {
     
    monster = createSprite(450,200,20,20);
    //to give random image to the monsters.
    var n = Math.round(random(1,2));
    
    if(n==1)
    {
      monster.addImage(alien1);
    }
    
    if(n==2)
    {
      monster.addImage(alien2);
    }
    //adding velocity and lifetime to the monster.
    monster.velocityX=-(10+score/10);
    monster.lifetime = 150;
    
    //adding monster to enemy group.
    enemyGroup.add(monster);
    
  }

}


function fruits(){
  if(frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    
    direction = Math.round(random(1,2));
    
    if(direction==1)
    {
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }
    
    else if(direction==2)
    {
      fruit.x = 0;
      fruit.velocityX = (7+(score/4));
    }
    
    //this is to add random fruits.
    var num = Math.round(random(1,4));
    
    if(num == 1)
    {

      fruit.addImage(fruit1);

    }

    else if(num == 2)
    {

      fruit.addImage(fruit2);

    }

    else if(num == 3)
    {

      fruit.addImage(fruit3);

    }

    else
    {

      fruit.addImage(fruit4);

    }
    //to create fruits at random y positions.
    fruit.y = Math.round(random(50,340));
    //resizing the fruits.
    fruit.scale = 0.2;
    //adding lifetime to avoid memory leak.
    fruit.lifetime = 100;
    
    //adding fruit to fruit group.
    fruitGroup.add(fruit);
  
  }  
}