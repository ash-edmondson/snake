var stage = document.getElementById('stage')
var c = stage.getContext('2d')

var rows = 20
var cols = 20
var empty = 'grey'
var wall = '#333333'
var fruit = 'orange'
var tileWidth = stage.width / cols
var tileHeight = stage.height / rows

var tiles = []

for (var y = 0; y < rows; y++){
  tiles[y] = []

  for (var x = 0; x < cols; x++){
    tiles[y][x] = empty
  }

}

function setTile(x, y, color){
  tiles[y][x] = color
}

function unsetTile(x, y){
  setTile(x, y, empty)
}

function tileIsSet(x,y){
return tiles[y][x] != empty
}

function tileIsFruit(x, y){
  return tiles[y][x] == fruit
}

function addFruit(){
  var x= Math.ceil(Math.random()* (cols - 1))
  var y= Math.ceil(Math.random()* (rows -1))
  

  if (tileIsSet (x, y)){
   addFruit()
   return
  }
  setTile(x, y, fruit)
}

addFruit()

// draw the border

// left side
for (var y = 0; y < rows; y++){
  setTile(0, y, wall)
}

// right side
for (var y = 0; y < rows; y++){
  setTile(cols - 1, y, wall)
}

// top
for (var x = 0; x < cols; x++){
  setTile(x, 0, wall)
}

// botttom
for (var x = 0; x < cols; x++){
  setTile(x, rows - 1, wall)
}

var snake = {
  dx: -1,
  dy: 0,
  h: {x: 10, y: 10},
  t: [
    {x: 11, y: 10},
    {x: 12, y: 10}
 ],

  dead: false,
  locked: false
}

function updateSnake(){

  snake.locked= false
  
 
if (snake.dead){

  alert(`Game Over, you scored ${snake.t.length -2} Points `)
    return

  return

}


 // update head
  var oldHead = Object.assign({}, snake.h)
  snake.h.x += snake.dx
  snake.h.y += snake.dy



var ateFruit = tileIsFruit(snake.h.x, snake.h.y)


  if (tileIsSet(snake.h.x, snake.h.y) && !ateFruit){
    snake.dead = true
     return
  }

 

  // add old head to tail
  snake.t.unshift(oldHead)

  //cut end of tail off 

  if (!ateFruit){ 
    var tailEnd = snake.t.pop()
    unsetTile(tailEnd.x, tailEnd.y)
  }else {
  addFruit()
}
  // draw the snake
  setTile(snake.h.x, snake.h.y, 'red')
  snake.t.forEach(t => setTile(t.x, t.y, 'green'))
}
updateSnake()

var frameCount = 0

function draw(t){
 
 frameCount++

 if (frameCount > 10){
   updateSnake()
   frameCount = 0
 }
 
  
  for (var y = 0; y < rows; y++){
    for (var x = 0; x < cols; x++){
      
      c.beginPath()
      c.rect(x*tileWidth, y*tileHeight, tileWidth, tileHeight)
      c.fillStyle = tiles[y][x]
      c.fill()

    }
  }
  
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)

document.addEventListener('keydown', function(e){

  if (snake.locked){
    return
  }
 snack.locked = true
 
switch(e.key){
 case 'ArrowUp':
  snake.dx = 0
  snake.dy = -1
  break
case 'ArrowDown':
  snake.dx = 0
  snake.dy = 1
  break
case 'ArrowLeft':
  snake.dx = -1
  snake.dy = 0
  break
case 'ArrowRight':
  snake.dx = 1
  snake.dy = 0
  break

}

})
