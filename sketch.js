//Create variables here
var dog, dog_image, happydog_image;
var database;
var foodS, foodStock;

function preload()
{
	//load images here
  dog_image = loadImage("Dog.png");
  happydog_image = loadImage("happydog.png");
}

function setup() {
	createCanvas(500, 500);

  dog =createSprite(250, 250, 100, 100);
  dog.addImage(dog_image);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref("/food");
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog_image);
  }

  drawSprites();
  textSize(20);
  fill("white");
  if(foodS){
  text("Food Stock: " + foodS, 150, 150);
  }
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref("/").update({
    food: x
  })
}

