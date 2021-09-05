const mapLevel = document.querySelector("canvas").getContext("2d");
height = 448;
width = 1024;
foods = new Array;
shelves = new Array;
mapLevel.canvas.height = height;
mapLevel.canvas.width = width;
currentLevel = 0; //debug purpose

//Makes floor
const makeFloor = function(ctx)
{
    floor = document.getElementById("floor")
    var pattern = ctx.createPattern(floor, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0,0,width, height);
}

//Paints shelves from the level array
//Should support more levels!
const buildShelves = function(ctx, level)
{
    //coords
    shelfX = 0
    shelfY = 0
    //Iterating throught the level and drawing the shelves
    for (i = 0; i < levels[level].length; i ++)
    {
        shelfX = 0; //reset x coord back to 0
        for (j = 0; j < levels[0][0].length; j++)
        {
            shelf = levels[level][i][j]
            if (shelf)
            {
                mapLevel.fillStyle = "#EC7C5F"; // hex for shelf color
                mapLevel.beginPath();
                mapLevel.rect(shelfX, shelfY, 32, 32);
                mapLevel.fill();
            }
            shelfX += 32;
        }
        shelfY += 32;
    }
}

//Only purpose is to load shelf objects
const buildShelves2 = function(ctx, level)
{
    shelfX = 0
    shelfY = 0
    for (i = 0; i < levels[level].length; i ++)
    {
        shelfX = 0;
        for (j = 0; j < levels[0][0].length; j++)
        {
            shelf = levels[0][i][j]
            if (shelf)
            {
                mapLevel.fillStyle = "#EC7C5F"; // hex for cube color
                mapLevel.beginPath();
                mapLevel.rect(shelfX, shelfY, 32, 32);
                mapLevel.fill();
                new Shelf(shelfX, shelfY);
            }
            shelfX += 32;
        }
        shelfY += 32;
    }
}

class Shelf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.heigth = 32;
        shelves.push(this);
        this.hasFood = Boolean(false);
        this.placeItem = function (food) {
            if (!this.hasFood) {
                food.xpos = this.x;
                food.ypos = this.y;
                this.hasFood = Boolean(true);
            }
        };
        const FoodItem = function (name, price, cals) {
            this.name = name;
            this.price = price;
            this.cals = cals;
            this.xpos = 0;
            this.ypos = 0;
            foods.push(this); //adds food to the list of foods
            this.showPrice = function () {
                return "$" + this.price.toString;
            };
        };
    }
}
const levels = [[
	[0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
	[0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0],
	[0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,0,0,1,0,0,0,1,1,1,1,0,0],
	[0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
	[0,0,1,0,1,1,0,1,0,1,1,0,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1],
	[0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,1],
	[0,0,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
	[0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,0,0,0,0,0,0,0,0,1],
	[0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1],
	[1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0],
	[1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0],
	[1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0,1,1,1,0,0],
	[1,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,0,1,0,0],
	[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]],
	
	[
	[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0],
	[0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0],
	[0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,1,0,1,1,1,0,0,1,0],
	[0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
	[0,0,0,1,1,0,1,0,1,0,0,1,0,1,0,1,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
	[1,1,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0],
	[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0],
	[1,0,1,1,1,0,1,0,0,1,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0],
	[1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1,1,0],
	[1,0,0,1,0,1,0,1,0,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0,0,1,0,0,0,0,0,0],
	[1,0,1,1,0,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,0,1,0,0,1,1,1,0,1,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0]]
	]

// Create a collection to hold the generated x food items
const foodXCoors = [];

const player = {

    img : document.getElementById("playerR"),
    img2: document.getElementById("playerL"),
    right: true,
    height: 32,
    width: 32,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0,

    draw: function(ctx){
        if (this.right)
        {
            ctx.drawImage(this.img, this.x, this.y);
        }
        else
        {
            ctx.drawImage(this.img2, this.x, this.y);
        }
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
            player.right = false;
            break;
        case 38:// up key
            controller.up = key_state;
            break;
        case 39:// right key
            controller.right = key_state;
            player.right = true;
            break;
        case 40: // down key
            controller.down = key_state;
            break;
    }

  }

};

const loop = function () {


    speed = 0.25;
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
    player.xVelocity *= 0.7;// friction
    player.yVelocity *= 0.7;// friction

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
  
    makeFloor(mapLevel);  
    buildShelves(mapLevel, currentLevel);  
    player.draw(mapLevel);
    

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

//builds shelf objects 
buildShelves2(mapLevel, currentLevel);

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);