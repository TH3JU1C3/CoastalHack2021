Shelf = function(x, y) {           
        this.x = x                        
        this.y = y
        this.width = 32
        this.heigth = 32
        shelves.push(this)
        this.hasFood = Boolean(false)
        this.placeItem = function(food) {            
        if (!this.hasFood) {
            food.xpos = this.x
            food.ypos = this.y
            this.hasFood = Boolean(true)
        }
    }
}
    FoodItem = function(name, price, cals) {  //Constructor
        this.name = name
        this.price = price
        this.cals = cals
        this.xpos = 0
        this.ypos = 0
        foods.push(this)                    //adds food to the list of foods
    }
    showPrice = function() {                //returns the price as a string, with a $ prepended
        return "$" + this.price.toString
    }

foods = new Array
shelves = new Array
