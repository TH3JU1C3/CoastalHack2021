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

foods = new Array

class Shelf {
    constructor(vertical, size) {
        this.x = 0
        this.y = 0
        this.width = 32
        this.heigth = 32
        this.size = size
        this.slots = new Array
        if (vertical) {
            this.width = 32
            this.heigth = 32 * size
        } else {
            this.width = 32 * size
            this.heigth = 32
        }
    }
    position = function(xpar, ypar) {
        this.x = xpar
        this.y = ypar
    }
    placeItem = function(food) {
        if (this.slots.length < this.size) {
            this.slots.push(food)
            if (this.vertical) {
                food.xpos = this.x
                food.ypos = this.y + 32*(this.slots.length - 1)
            } else {
                food.xpos = this.x + 32*(this.slots.length - 1)
                food.ypos = this.y
            }
        }
    }

}
