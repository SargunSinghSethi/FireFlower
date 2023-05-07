import Game from "./Game.js";
import Projectile from "./Projectile.js";

const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");

const game = new Game();
game.init();

const canvas = document.getElementById("screen");
canvas.width = innerWidth;
canvas.height = innerHeight;
startGameBtn.addEventListener("click", () => {
  game.init();
  game.music.backgroundMusic.currentTime = 0;
  game.music.backgroundMusic.play();
  game.render();
  modalEl.style.display = "none";
});
window.addEventListener("keydown", ({ key }) =>
  game.player.keyboard.keydown(key, game.player)
);
window.addEventListener("keyup", ({ key }) => game.player.keyboard.keyup(key));

addEventListener("click", (event) => {
  if (game.fireFlowerAbility === true) {
    game.music.fireFlowerShot.play();
    game.music.fireFlowerShot.playbackRate = 2;
    let velocity = {};
    if (event.clientX > game.player.position.x + game.player.width / 2) {
      velocity = {
        x: 10,
        y: 6,
      };
    } else {
      velocity = {
        x: -10,
        y: 6,
      };
    }
    game.projectiles.push(
      new Projectile(
        game.player.position.x + game.player.width / 2,
        game.player.position.y + game.player.height / 2,
        10,
        "red",
        {
          x: velocity.x,
          y: velocity.y,
        }
      )
    );
  }
});
