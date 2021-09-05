const mapLevel = document.querySelector("canvas").getContext("2d");
//const imagetest = 
height = 500;
width = 1220;

mapLevel.canvas.height = height;
mapLevel.canvas.width = width;

// Create a collection to hold the generated x food items
const foodXCoors = [];

const player = {

    img : document.getElementById("banana"),
    height: 32,
    width: 32,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0,

    draw: function(ctx){
        ctx.drawImage(this.img, this.x, this.y);
    }
};


const controller = {

  left: false,
  right: false,
  up: false,
  down: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

        case 37:// left key
            controller.left = key_state;
            break;
        case 38:// up key
            controller.up = key_state;
            break;
        case 39:// right key
            controller.right = key_state;
            break;
        case 40: // down key
            controller.down = key_state;
            break;
    }

  }

};

const loop = function () {
    speed = 0.5;
    if (controller.up) {
            player.yVelocity -= speed;
    }
    if (controller.down){
            player.yVelocity += speed;
    }
    if (controller.left) {
            player.xVelocity -= speed;
    }
    if (controller.right) {
        player.xVelocity += speed;
    }

    player.x += player.xVelocity;// movement
    player.y += player.yVelocity;// movement
    player.xVelocity *= 0.9;// friction
    player.yVelocity *= 0.9;// friction

    // if square is falling below floor line
    if (player.y >= height - player.width) {
        player.y = height - player.width;
        player.yVelocity = 0;
    }

    //if square is moving through the ceiling
    if (player.y <= 0)
    {
        player.y = 0;
        player.yVelocity = 0;
    }

    // if square is going off the left of the screen
    if (player.x <= 0) {
        player.x = 0;
        player.xVelocity = 0;
    } 
    else if (player.x >= width - player.width) {// if square goes past right boundary

        player.x = width - player.width;
        player.xVelocity = 0;
  }
  // Creates the backdrop for each frame
  mapLevel.fillStyle = "#201A23";
  mapLevel.fillRect(0, 0, width, height); // x, y, width, height


  // Creates and fills the cube for each frame
//   mapLevel.fillStyle = "#8DAA9D"; // hex for cube color
//   mapLevel.beginPath();
//   mapLevel.rect(player.x, player.y, player.width, player.height);
//   mapLevel.fill();
player.draw(mapLevel);
    

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);