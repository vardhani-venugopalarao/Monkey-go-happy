var monkey, monkeyAnimation, bananaImage, bananaGroup, obstacleImage, obstacleGroup, ground;
var score = 0;
var back, backImage;

function preload(){
  //Loads all animations and images
  monkeyAnimation = loadAnimation("https://assets.editor.p5js.org/5efa413981c1f5002405a441/4bc87e0f-5d65-40fd-b6fa-eb784075fd7a.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/c037809e-5cdd-40a5-93ce-33de457c428e.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/4d693f4c-a96b-4608-9cc5-c97a66ef0e27.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/5c3aa923-885e-472d-bab2-4af163076182.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/8331b2b4-36ec-4672-881b-4a4849bbea4f.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/6782762f-f105-4118-a6ba-35e3bca6671a.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/10ac9b2f-38da-4332-b6cd-c45b79c9f596.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/2a39dbda-d1f0-4abf-aa83-27fdbea5d70b.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/9b6c398a-63fe-47cf-bdf5-e8b6f70925ed.png", "https://assets.editor.p5js.org/5efa413981c1f5002405a441/4e756256-f0fb-4c05-b841-d43f767b9e30.png");
  
  bananaImage = loadImage("https://assets.editor.p5js.org/5efa413981c1f5002405a441/f4f53c2c-24ea-4fdb-b9a8-c5f43054c9bb.png");
  
  obstacleImage = loadImage("https://assets.editor.p5js.org/5efa413981c1f5002405a441/dfed82bc-29c6-420e-a8a4-077f48b8a2d1.png");
  
  backImage = loadImage("https://assets.editor.p5js.org/5efa413981c1f5002405a441/7e9cdbb3-304c-4bc8-bcc3-6f6712a59bdc.png");
}  

function setup() {
  createCanvas(400, 270);
  
  //Creates the background sprite and adds the image
  back = createSprite(200,140);
  back.addImage("background", backImage);
  back.scale = 1.4;
  //I didn't add velocity because the background image is too small
  
  //Creates and adds the monkey sprite and animation
  monkey = createSprite(50,200);
  monkey.addAnimation("monkey_running", monkeyAnimation);
  monkey.scale = 0.08;
  
  //Creates an invisible ground
  ground = createSprite(200,230,400,10);
  ground.visible = false;
  
  //Creates the banana and obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup(); 
}

function draw() {
  background(255);
  
  //Creates gravity and invisible floor to collide
  monkey.velocityY = monkey.velocityY + 0.7
  monkey.collide(ground);
  
  //Makes the monkey jump when space is pressed
  if(keyDown("space")&&monkey.y>190){
    monkey.velocityY = -12;
  }
  
  //Adds the score when the monkey touches a banana
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  }  
  
  //Resets the score when the monkey touches a rock
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    score = 0;
  }  
  
  //Makes the monkey bigger the higher the score
  switch(score){
    case 0: monkey.scale = 0.08; break;
    case 10: monkey.scale = 0.09; break;
    case 20: monkey.scale = 0.10; break;
    case 30: monkey.scale = 0.11; break;
    default: break;
  }    
  
  //Calls the spawn banana and spawn obstacles function
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
  
  //Adds the text to show the score
  fill("white")
  textSize(15);
  text("Score: "+ score, 300,40);
  
}

//Creates a banana sprite every 80 frames
function spawnBanana() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(400,random(80,200),10,40);
    banana.addImage(bananaImage);
    
    //Assigns velocity to the banana
    banana.velocityX = -7;
    
    //assign scale and lifetime to the banana           
    banana.scale = 0.05;
    banana.lifetime = 70;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

//Creates a obstacle sprite every 300 frames
function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,200,10,40);
    obstacle.addImage(obstacleImage);
    
    //Assigns velocity to the obstacle
    obstacle.velocityX = -9;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 50;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}