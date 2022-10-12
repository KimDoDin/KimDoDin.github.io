const player = document.querySelector(".player");
let numBombsDodged = 0;
let bombsDodged = document.querySelector('h1');
let gameOver = false;

function generateRandomNumber(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
}

let moveInterval, isMoving = false;

const startMoving = (direction) => {
  if (isMoving) return;
  isMoving = true;
  moveInterval = setInterval(() => {
    player.style.left = direction == "right" ? player.offsetLeft + 20 + "px" : player.offsetLeft - 20 + "px";
    player.style.transform = direction == "right" ? "scaleX(-1)" : "scaleX(1)";
    if (player.offsetLeft < -50) {
      player.style.left = '100vw';
    } else if (player.offsetLeft > window.innerWidth + 30) {
      player.style.left = '-50px';
    }
  }, 50)
}

const move = (e) => {
  if (e.key === "ArrowRight") {
    startMoving('right')
  } else if (e.key === "ArrowLeft") {
    startMoving('left')
  } else if (e.keyCode=== 32) {
    player.classList.add('jump');
    setTimeout(() => {
      player.classList.remove('jump');
    }, 610)
  }
};
let removeBomb;

const createBomb = (delay) => {
  console.log(delay);
  if (gameOver) return;
  setTimeout(() => {
    createBomb((numBombsDodged > 1 && numBombsDodged % 10 == 0 )? delay - 25 : delay);
  }, delay)
  let bomb = document.createElement('div');
  bomb.className = "ob";
  bomb.style.left = generateRandomNumber(0,99) + 'vw';
  document.body.appendChild(bomb);
  setTimeout(() => {
    if (!gameOver){
      numBombsDodged++;
      bombsDodged.textContent = `Bombs Dodged: ${numBombsDodged}`;
      bomb.classList.add('explosion');
    }
  }, 3500);
  removeBomb = setTimeout(() => {
    if (!gameOver) {
      bomb.remove();
    }
  }, 4000)
}

createBomb(1000);

let game = setInterval(() => {
  let obs = document.querySelectorAll(".ob");
  for (let i = 0; i < obs.length; i++) {
    let bombL = obs[i].offsetLeft;
    let bombR = obs[i].offsetLeft + obs[i].offsetWidth;
    let bombTop = obs[i].offsetTop;
    let bombBottom = obs[i].offsetTop + obs[i].offsetHeight;
    let playerL = player.offsetLeft;
    let playerR = player.offsetLeft + player.offsetWidth;
    let playerTop = player.offsetTop;
    // let playerBottom = player.offsetTop + player.offsetHeight;

    if (bombR > playerL + 20 && bombL < playerR - 20 && bombBottom > playerTop + 10) {
      console.log("COLLISION!");
      console.log('bombL: ', bombL)
      console.log('bombR: ', bombR)
      console.log('bombTop: ', bombTop)
      console.log('bombBottom: ', bombBottom)
      console.log('playerL: ', playerL)
      console.log('playerR: ', playerR)
      console.log('playerTop: ', playerTop)
      // console.log('playerBottom: ', playerBottom)
      obs[i].classList.add('explosion');
      gameOver = true;
      clearInterval(game);
      clearInterval(moveInterval);
      clearTimeout(removeBomb);
      for (let ob of obs) {
        // ob.style.animationPlayState === "paused";
        ob.classList.add("dead");
        document.querySelector("#haha").classList.add("show");
        window.removeEventListener("keydown", move);
      }
    }
  }
}, 100);

window.addEventListener("keydown", move);
window.addEventListener("keyup", function(e) {
  if (e.key == "ArrowRight" || e.key == "ArrowLeft"){
    isMoving = false;
    clearInterval(moveInterval);
  }
});

