class foodItem {
    constructor(type, name, price, happiness, texture) {  //Constructor
        this.type = type
        this.name = name
        this.price = price
        this.happiness = happiness
        this.texture = texture
        this.xpos = 0
        this.ypos = 0
        foods.push(this)                    //adds food to the list of foods
    }
    showPrice = function() {                //returns the price as a string, with a $ prepended
        return "$" + this.price.toString
    }
}

foods = new Array                           //an array listing all the foods that have been made
shelves = new Array                         //an array listing all the shelves that have been made

class Shelf {
    constructor(x, y) {           
        this.x = x * 32                        
        this.y = y * 32
        this.width = 32
        this.heigth = 32
        shelves.push(this)
        this.hasFood = Boolean(false)
    }
    placeItem = function(food) {            
        if (!hasFood) {
            food.xpos = this.x
            food.ypos = this.y
            this.hasFood = Boolean(true)
        }
    }
}
