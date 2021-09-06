const shelfcolleft = function(curshelf) {
    return ((player.x + 30) < (curshelf.x + 16) && (player.x + 30) > curshelf.x) && (((player.y + 16) < (curshelf.y + 16) && (player.y + 16) > curshelf.y) || (player.y + 16 > (curshelf.y + 16) && player.y + 16 < (curshelf.y + 30)))
}
const shelfcolright = function(curshelf) {
    return (player.x > (curshelf.x + 16) && player.x < (curshelf.x + 30)) && (((player.y + 16) < (curshelf.y + 16) && (player.y + 16) > curshelf.y) || (player.y + 16 > (curshelf.y + 16) && player.y + 16 < (curshelf.y + 30)))
}
const shelfcolup = function(curshelf) {
    return ((player.y + 30) < (curshelf.y + 16) && (player.y + 30) > curshelf.y) && ((player.x + 16 > (curshelf.x + 16) && player.x + 16 < (curshelf.x + 30)) || ((player.x + 16) < (curshelf.x + 16) && (player.x + 16) > curshelf.x))
}
const shelfcoldown = function(curshelf) {
    return (player.y > (curshelf.y + 16) && player.y < (curshelf.y + 30)) && (((player.x + 16) < (curshelf.x + 16) && (player.x + 16) > curshelf.x) || (player.x + 16 > (curshelf.x + 16) && player.x + 16 < (curshelf.x + 30)))
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