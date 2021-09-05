class foodItem {
    constructor(type, name, price, happiness, texture) {  //Constructor
        this.type = type
        this.name = name
        this.price = price
        this.happiness = happiness
        this.texture = texture
        xpos
        ypos
        foods.push(this)                    //adds food to the list of foods
    }
    showPrice = function() {                //returns the price as a string, with a $ prepended
        return "$" + this.price.toString
    }
    setPos = function(x, y) {
        xpos = x
        ypos = y
    }
}

foods = new Array

class Shelf {
    constructor(vertical, size) {
        x
        y
        width
        heigth
        slots = new Array
        slotcoordx = new Array
        slotcoordy = new Array
        if (vertical) {
            width = 32 * size
            heigth = 32
        } else {
            width = 32
            heigth = 32 * size
        }
    }
    position = function(xpar, ypar) {
        x = xpar
        y = ypar
    }
    placeItem = function(food) {
        if (this.slots.size < this.size) {
            this.slots.push(food)
            if (this.vertical) {
                food.xpos = this.x + 16
                food.ypos = this.y + 16 + 32*(slots.size - 1)
            } else {
                food.xpos = this.x + 16 + 32*(slots.size - 1)
                food.ypos = this.y + 16
            }
        }
    }
}
