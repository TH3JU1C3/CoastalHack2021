const mapLevel = document.querySelector("canvas").getContext("2d");
const KarmaticArcade_font = new FontFace('Karmatic-Arcade', 'url(Font/ka1.ttf)');
KarmaticArcade_font.load().then(function(font) {
  // Ready to use the font in a canvas context
  console.log('font ready');

  // Add font on the html page
  document.fonts.add(font);
});
document.getElementById("musicPlayer").volume = 0.2;
document.getElementById("musicPlayer").currentTime = 1;
height = 448;
width = 1024;
timer = 60;
score = 0;
foods = new Array;
shelves = new Array;
mapLevel.canvas.height = height;
mapLevel.canvas.width = width;
currentLevel = 0; //debug purpose
foodString = ["bacon", "cheese", "bbq", "cookies", "chips", "soda", "wine", "banana", "pepper", "cabbage", "fish", "apple", "milk", "beef"]

//random starting values
money = 10000000
calories = 0

//collision detection functions
const shelfcolleft = function(curshelf) {
    return ((player.x + 30) <= (curshelf.x + 16) && (player.x + 30) >= curshelf.x) && (((player.y + 16) <= (curshelf.y + 16) && (player.y + 16) > curshelf.y) || (player.y + 16 > (curshelf.y + 16) && player.y + 16 < (curshelf.y + 30)))
}
const shelfcolright = function(curshelf) {
    return (player.x >= (curshelf.x + 16) && player.x <= (curshelf.x + 30)) && (((player.y + 16) <= (curshelf.y + 16) && (player.y + 16) > curshelf.y) || (player.y + 16 > (curshelf.y + 16) && player.y + 16 < (curshelf.y + 30)))
}
const shelfcolup = function(curshelf) {
    return ((player.y + 30) <= (curshelf.y + 16) && (player.y + 30) >= curshelf.y) && ((player.x + 16 >= (curshelf.x + 16) && player.x + 16 < (curshelf.x + 30)) || ((player.x + 16) < (curshelf.x + 16) && (player.x + 16) > curshelf.x))
}
const shelfcoldown = function(curshelf) {
    return (player.y >= (curshelf.y + 16) && player.y <= (curshelf.y + 30)) && (((player.x + 16) <= (curshelf.x + 16) && (player.x + 16) > curshelf.x) || (player.x + 16 > (curshelf.x + 16) && player.x + 16 < (curshelf.x + 30)))
}

const distance = function(a, b) {       //a is the player, b is the food. calculates the distance between the two, and returns said distance
    x = Math.abs(a.x - b.xpos)
    y = Math.abs(a.y - b.ypos)
    return Math.sqrt(x * x + (y * y))
}

//Makes floor
const makeFloor = function(ctx)
{
    floor = document.getElementById("floor")
    var pattern = ctx.createPattern(floor, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0,0,width, height);
}

const drawFood = function(ctx) {            //all the food stuff that needs to be in the loop.
    foods.map(x => x.draw(ctx));
    foods.map(x => x.playerdis());
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
                new Shelf(shelfX, shelfY);
            }
            shelfX += 32;
        }
        shelfY += 32;
    }
}

const putFood = function(){
    //some random foods (bacon being a placeholder for now, some foods dont work and no clue why)
    index = 0
    for (i = 0; i < shelves.length; i++) {
        index += 1;
        if (index >= foodString.length)
        {
            index = 0;
        }
        new FoodItem(foodString[index], 100)
    }
}

class Shelf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        shelves.push(this);
        this.hasFood = Boolean(false);
        this.placeItem = function (food) {
            if (!this.hasFood) {
                food.xpos = this.x;
                food.ypos = this.y;
                this.hasFood = Boolean(true);
            }
        };

    }
}
class FoodItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.xpos = 0;
        this.ypos = 0;
        this.img = document.getElementById(name)
        foods.push(this); //adds food to the list of foods
        this.showPrice = function () {
            return "$" + this.price.toString;
        };
        this.draw = function(ctx) {
            ctx.drawImage(this.img, this.xpos, this.ypos);
        }
        this.playerdis = function() {                   //checks distance to player, if short enough, remove this item
            if (distance(player, this) < 31 && (money >= this.price)) {
                money -= this.price
                delete foods[foods.indexOf(this)]
            }
        }
    };
}
const levels = [[
	[0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
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

drawScore = function(ctx) {
	ctx.fillStyle = "rgba(30,30,30,0.3)";
	ctx.fillRect(768,0,256,32);
	ctx.font = "24px Karmatic-Arcade";
	ctx.fillStyle = "rgba(255,255,255,1)";
	if (score >= 0) {
		scoreString = score.toString().padStart(6,"0");
	}
	else {
		scoreString = (-score).toString().padStart(6,"0").padStart(7,"-");
	}
	ctx.fillText("Score "+scoreString,774,24);
}

drawTimer = function(ctx) {
	ctx.fillStyle = "rgba(30,30,30,0.3)";
	ctx.fillRect((width/2) - 32,0,64,32);
	ctx.font = "24px Karmatic-Arcade";
	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fillText(timer.toString().padStart(2,"0"),(width/2) - 25,24);
}

//Loop where all the important stuff happens
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
    for(i = 0; i < shelves.length; i++) {   //if player collides with a shelf
        const curshelf = shelves[i]
        if (shelfcolleft(curshelf)) {
            player.xVelocity = -1
        }
        else if (shelfcolright(curshelf)) {
            player.xVelocity = 1
        }
        else if (shelfcolup(curshelf)){
            player.yVelocity = -1
        }
        else if (shelfcoldown(curshelf)){
            player.yVelocity = 1
        }
    }
  
    //Drawing all the important stuff
    makeFloor(mapLevel);  
    buildShelves(mapLevel, currentLevel);  
    player.draw(mapLevel);
    drawFood(mapLevel);
	drawScore(mapLevel);
	drawTimer(mapLevel);
    

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

//builds shelf objects 
buildShelves2(mapLevel, currentLevel);

putFood();


//add food to shelves
shelves.map(x => x.placeItem(foods[shelves.indexOf(x)]))

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);