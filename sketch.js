var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon_new=createSprite(250,450,150,150);
  balloon_new.addAnimation("hotAirBalloon",balloonImage1);
  balloon_new.scale=0.5;

  textSize(20); 

  var balloon_position = database.ref('ballon/position');
  balloon_position.on("value",readPosition, showerror);
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon_new.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updatePosition(-10,0);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon_new.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updatePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon_new.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updatePosition(0,-10);
    balloon_new.scale=  balloon_new.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon_new.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updatePosition(0,10);
    balloon_new.scale=  balloon_new.scale+0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePosition(a,b)
{
  database.ref('ballon/position').set({
    'x': position.x + a,
    'y': position.y + b
  })
}



function readPosition(data)
{
  position=data.val();
  balloon_new.x=position.x;
  balloon_new.y=position.y;
}


function showerror()
{
  console.log("error in fetching data");
}