const ctx = document.querySelector("canvas").getContext("2d");
const playerSprite = new Image()
playerSprite.src = "PlayerCycle.png"

ctx.canvas.height = 500;
ctx.canvas.width = 500;

// Start the frame count at 1
let level = "Home";
var floor = 1;


const HomeBoxes = [];
const TownABoxes = [];
const MedBay = [];



function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x)
  console.log("Coordinate y: " + y);
}

let canvasElem = document.querySelector("canvas");




function CheckCollision()
{}




// Create a collection to hold the generated x coordinates


class C_Player{
constructor(x,y,w,h,image)
{
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.image = image;
  this.xVelocity = 0;
  this.yVelocity = 0;

  
}
draw()
{
  ctx.drawImage(this.image,this.x,this.y,128,128,0,0,16,32);
}


}


class Box{
constructor(x,y,w,h,color)
{
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
  
}
draw()
{
 ctx.fillStyle = this.color;
 ctx.fillRect(this.x,this.y,this.w,this.h);
  
}


}


function CreateWorld()
{
  const MedbayCounter = new Box(100,250,200,30,"Blue");
  MedBay.push(MedbayCounter);


  const HomeExit = new Box(150,0,200,20,"red");
  HomeBoxes.push(HomeExit);

//Town
  const TownExit = new Box(150,0,200,20,"orange");
  TownABoxes.push(TownExit);
  

}



// Create the obstacles for each frame

const controller = {

  left: false,
  right: false,
  up: false,
  down: false,
  reseting: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;
    
    switch (event.keyCode) {

      case 37:// left key
        controller.left = key_state;
        break;
      case 38:// up key
        controller.up = key_state;
        break;
      case 40:// up key
        controller.down = key_state;
        break;
      case 39:// right key
        controller.right = key_state;
        break;
      case 82:// right key
        controller.rotate = key_state;
        break;

    }

  }

};
CreateWorld();

let img2 = document.getElementById("sprite");

const player = new C_Player(250,250,16,32,img2);

let img = document.getElementById("myImage");

function Input()
{
  if (controller.up  ) {

    player.yVelocity -= .2 ;
    

  }
  else if (controller.down) {

    player.yVelocity += .2 ;

    

  }
  else if (controller.right) {

    player.xVelocity += 0.2;

  }
  else if (controller.left) {

    player.xVelocity -= 0.2;

  }

  
}
function BorderCollision()
{
    if (player.y > 500 - player.height / 2) {

    player.jumping = false;
    player.y = 500 - player.height / 2;
    player.yVelocity = 0;
    

  }
  if (player.y < 0 +  player.height / 2 ) {

    player.jumping = false;
    player.y = 0 + player.height / 2 ;
  }
  if(player.x < 0 + player.width / 2)
  {
    player.x = 0 + player.width / 2;
    player.xVelocity = 0;
  }
  if(player.x > 500 - player.width / 2 )
  {
    player.x = 500 - player.width / 2;
    player.xVelocity = 0;
  }


}



const loop = function () {

//#region Falling Stopper
// if square is falling below floor line
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, 1300, 600); // x, y, width, height


 

  Input();
  BorderCollision();
  player.draw();
  //#endregion

//#region Controller
  
  //#endregion

//#region Gravity and Friction
  
  player.x += player.xVelocity;
  player.y += player.yVelocity;
  player.xVelocity *= 0.9;// friction
  player.yVelocity *= 0.9;// friction
  
 // Creates the backdrop for each frame
  //#region DrawMap
   
   switch(level)
  {
  case "Home":
    ctx.fillText(level,150,350);

    for(let i = 0; i < HomeBoxes.length; i++)
    {
      HomeBoxes[i].draw();
    }
      
    // If Player Box collides with door
    if(player.x > HomeBoxes[0].x && player.x < player.x + HomeBoxes[0].w && player.y > HomeBoxes[0].y && player.y < HomeBoxes[0].y + HomeBoxes[0].h * 2)
    {
      player.xVelocity = 0;
      player.yVelocity = 0;
      level = "Town";
      console.log("Town");
      player.y = 484;
      player.x = 250;
    }  


    
    break;
  case "Town":
    ctx.fillText(level,150,350);
    for(let i = 1; i < TownABoxes.length; i++)
    {
      TownABoxes[i].draw();
    }
    break;
  case "Medbay":
    for(let i = 0; i < MedBay.length; i++)
    {
      MedBay[i].draw();
    }
 
}
  //#endregion
  // Creates the backdrop for each frame
  

 
  //#endregion
  


  
  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.addEventListener("mousemove", function(e)
{
  console.clear();
  getMousePosition(canvasElem, e);
  
  
});

window.requestAnimationFrame(loop);
