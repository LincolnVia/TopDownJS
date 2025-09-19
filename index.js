const ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 500;
ctx.canvas.width = 500;

// Start the frame count at 1
let level = "home";
var floor = 1;
const Boxes = [];




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


const square = {

  height: 32,
  jumping: true,
  width: 32,
  x: 250,
  xVelocity: 0,
  y: 250,
  yVelocity: 0,
  color: "#8DAA9D"

};
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
function CreateBox(x,y,w,h,color)
{
  const box = new Box(x,y,w,h,color);
  Boxes.push(box);
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

CreateBox(150,0, 200,20,"black");


const loop = function () {

//#region Falling Stopper
// if square is falling below floor line

 
  if (square.y > 500 - square.height / 2) {

    square.jumping = false;
    square.y = 500 - square.height / 2;
    square.yVelocity = 0;
    

  }
  if (square.y < 0 +  square.height / 2 ) {

    square.jumping = false;
    square.y = 0 + square.height / 2 ;
  }
  if(square.x < 0 + square.width / 2)
  {
    square.x = 0 + square.width / 2;
    square.xVelocity = 0;
  }
  if(square.x > 500 - square.width / 2 )
  {
    square.x = 500 - square.width / 2;
    square.xVelocity = 0;
  }
  
  //#endregion

//#region Controller
  if (controller.up  ) {

    square.yVelocity -= .2 ;
    

  }
  else if (controller.down) {

    square.yVelocity += .2 ;
    

  }
  else if (controller.right) {

    square.xVelocity += 0.2;

  }
  else if (controller.left) {

    square.xVelocity -= 0.2;

  }

  //#endregion

//#region Gravity and Friction
  
  square.x += square.xVelocity;
  square.y += square.yVelocity;
  square.xVelocity *= 0.9;// friction
  square.yVelocity *= 0.9;// friction
  
 // Creates the backdrop for each frame
  //#region DrawMap
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, 1300, 600); // x, y, width, height

  for(let i = 0; i < Boxes.length; i++)
  {
    Boxes[i].draw();
  }

  //#endregion
  if(level == "home")
  {
    ctx.fillText(level,150,350);
  
 
  }
  if(level == "town")
  {
    
  }
  //#endregion
  // Creates the backdrop for each frame
  

  // Creates and fills the cube for each frame
  ctx.fillStyle = square.color; ; // hex for cube color
  ctx.beginPath();
  ctx.rect(square.x - square.width / 2, square.y - square.height / 2 , square.width, square.height);

  ctx.fill();
 
  //#endregion
  

  ctx.font = "30px Arial";
  ctx.fillText(floor, 1000, 100);
  ctx.fillText(Math.trunc(square.x), square.x, square.y - 32);
  ctx.fillText(Math.trunc(square.y), square.x + 64, square.y - 32);



  
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
