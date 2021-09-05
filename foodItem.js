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

class Shelf {
    constructor(vertical, size) {           //verticality is signified by a Boolean. True means the shelf should be vertically aligned, and false horizontally.
        this.x = 0                          //size refers to how many 32x32 slots the shelf uses. each slot provides room for one food item
        this.y = 0
        this.width = 32
        this.heigth = 32
        this.size = size
        this.slots = new Array              //an Array showing which foods are placed on the shelf
        if (vertical) {                     //checks if it's horizontal or vertical, and adjusts heigth/width accordingly
            this.width = 32
            this.heigth = 32 * size
        } else {
            this.width = 32 * size
            this.heigth = 32
        }
    }
    position = function(xpar, ypar) {       //sets the position of the shelf. presumably where the top-left corner of the shelf is.
        this.x = xpar
        this.y = ypar
    }
    placeItem = function(food) {            
        if (this.slots.length < this.size) {        //can't place in a full shelf
            this.slots.push(food)                   //adds the food to the next slot
            if (this.vertical) {                    //checks vertical/horizontal
                food.xpos = this.x 
                food.ypos = this.y + 32*(this.slots.length - 1)
            } else {
                food.xpos = this.x + 32*(this.slots.length - 1)
                food.ypos = this.y
            }
        }
    }

}
