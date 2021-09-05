class foodItem {
    constructor(type, name, price, happiness, texture) {  //Constructor
        this.type = type
        this.name = name
        this.price = price
        this.happiness = happiness
        this.texture = texture
        foods.push(this)                    //adds food to the list of foods
    }
    showPrice = function() {                //returns the price as a string, with a $ prepended
        return "$" + this.price.toString
    }
    showPos = function() {                  //returns the coordinates of the item (provided there are coordinates for it)
        return mapped.get(this)
    }
}

class coordinates {
    constructor(xCoord, yCoord) {           //constructor, one x coord, and one y coord
        this.x = xCoord
        this.y = yCoord
        coords.push(this)                   //adds coordinates to the list of coordinates
    }

}

coords = new Array
foods = new Array

mapped = new Map                            //keeps track of coordinates of all foods
mapItem = function(food, co) {              //maps a food item to a set of coordinates
    mapped.set(food, co)
}