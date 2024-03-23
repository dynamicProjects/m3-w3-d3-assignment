const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let timer = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here

  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

 
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    timer
  };
}

function update() {
  let imgIndex;
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    item.timer++;
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    if(item.velocity.x < 0){
      imgIndex =3;
    }else{
      imgIndex=1
    }
    if(item.timer ==15){
      item.newimg.src= `./images/PacMan${imgIndex + 1}.png`;
    }else if(item.timer ==30){
      item.timer=-1;
    }else if(item.timer==0){
      item.newimg.src= `./images/PacMan${imgIndex}.png`;
    }
  });
 
  setTimeout(update, 20);
}
// Add event listener to the "Update" button
startBtn.addEventListener("click", function () {
  update();
});

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  const gameWidth = 700;
  const gameHeight = 700;

  // Check collision with left and right walls
  if (item.position.x <= 0 || item.position.x >= gameWidth - item.newimg.width) {
    item.velocity.x *= -1; // Reverse the x velocity to make the Pacman bounce
  }

  // Check collision with top and bottom walls
  if (item.position.y <= 0 || item.position.y >= gameHeight - item.newimg.height) {
    item.velocity.y *= -1; // Reverse the y velocity to make the Pacman bounce
  }
  
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addBtn");

  // Add event listener to the "Add PacMan" button
  addBtn.addEventListener("click", function () {
    makeOne();
  });
});

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
