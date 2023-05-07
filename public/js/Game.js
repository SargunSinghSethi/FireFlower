import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Platform from "./Platforms.js";
import GenericObject from "./GenericObject.js";
import FireFlower from "./FireFlower.js";
import Win from "./Win.js";
import Particle from "./Particle.js";
import Music from "./Music.js";

const canvas = document.getElementById("screen");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const modalEl = document.querySelector("#modalEl");
const startGameBtn = document.querySelector("#startGameBtn");

export default class Game {
  constructor() {
    this.platformImage;
    this.platformSmallTall;
    this.player = new Player();
    this.platforms = [];
    this.genericObjects = [];
    this.enemies = [];
    this.fireFlower = [];
    this.endGame = false;
    this.win = [];
    this.projectiles = [];
    this.animationId = 0;
    this.particles = [];
    this.fireFlowerAbility = false;
    this.music = new Music();
    this.conditions = [];
  }

  init() {
    this.platformImage = this.createImage("platform");
    this.halfHalfPlatformImage = this.createImage("halfHalfPlatform");
    this.halfPlatformImage = this.createImage("halfPlatform");
    this.platformSmallTall = this.createImage("platformSmallTall");
    this.fireFlowerAbility = false;
    this.platforms = [
      new Platform({ x: -1, y: 532, image: this.platformImage }),
      new Platform({
        x: this.platformImage.width - 3,
        y: 532,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width + 5,
        y: 200,
        image: this.halfPlatformImage,
      }),
      new Platform({
        x: this.platformImage.width * 2 + 150,
        y: 200,
        image: this.platformSmallTall,
      }),
      new Platform({
        x: this.platformImage.width * 3 + 200,
        y: 200,
        image: this.halfHalfPlatformImage,
      }),
      new Platform({
        x: this.platformImage.width * 4 + 200,
        y: 532,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 5 + 200 - 3,
        y: 532,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 5 + 200 - 3,
        y: 300,
        image: this.platformImage,
      }),
      new Platform({
        x:
          this.platformImage.width * 5 + 200 - 5 + this.platformSmallTall.width,
        y: 200,
        image: this.platformSmallTall,
      }),
      new Platform({
        x: this.platformImage.width * 7 + 60,
        y: 150,
        image: this.halfPlatformImage,
      }),
      new Platform({
        x: this.platformImage.width * 8 + 150,
        y: 150,
        image: this.halfHalfPlatformImage,
      }),
      new Platform({
        x: this.platformImage.width * 9 + 150,
        y: 350,
        image: this.halfHalfPlatformImage,
      }),
      new Platform({
        x: this.platformImage.width * 10 + 150 - 3,
        y: 200,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 11 + 150 - 3,
        y: 326,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 12 + 150 - 3,
        y: 450,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 13 + 150 - 3,
        y: 326,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 14 + 150 - 4,
        y: 326,
        image: this.platformImage,
      }),
      new Platform({
        x:
          this.platformImage.width * 14 +
          150 -
          5 +
          this.platformSmallTall.width,
        y: 200,
        image: this.platformSmallTall,
      }),
      //
      new Platform({
        x: this.platformImage.width * 16 + 140,
        y: 150,
        image: this.platformImage,
      }),

      new Platform({
        x: this.platformImage.width * 18 + 140,
        y: 400,
        image: this.platformImage,
      }),
      //
      new Platform({
        x: this.platformImage.width * 20 + 80,
        y: 250,
        image: this.halfHalfPlatformImage,
      }),
      new Platform({
        x: this.platformImage.width * 21 + 80,
        y: 150,
        image: this.halfHalfPlatformImage,
      }),
      new Platform({
        x: this.platformImage.width * 22 + 100,
        y: 532,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 23 + 100 - 2,
        y: 532,
        image: this.platformImage,
      }),
      new Platform({
        x: this.platformImage.width * 24 + 100 - 3,
        y: 532,
        image: this.platformImage,
      }),
    ];
    this.genericObjects = [
      new GenericObject({
        x: -2,
        y: -4,
        image: this.createImage("/GenericObjects/background"),
        width: innerWidth,
        height: innerHeight,
      }),
      new GenericObject({
        x: -1,
        y: -1,
        image: this.createImage("/GenericObjects/hills"),
        width: 1000,
        height: 550,
      }),
    ];
    this.player = new Player();
    this.enemies = [
      new Enemy("SnailTail", 700, 100, 1000, 100, "#14c38e"),
      new Enemy("bee", 400, 100, 750, 100, "#ffcc00"),
      new Enemy("SnailTail", 1300, 100, 1500, 100, "#14c38e"),
      new Enemy("bee", 2520, 100, 3080, 100, "#ffcc00"),
      new Enemy("blueBat", 3080, 100, 3300, 100, "#26a9e0"),
      new Enemy("blueBat", 5920, 100, 6450, 100, "#26a9e0"),
      new Enemy("SnailTail", 7106, 100, 7596, 100, "#14c38e"),
      new Enemy("bee", 8556, 100, 8780, 100, "#ffcc00"),
      new Enemy("blueBat", 9400, 100, 9920, 100, "#26a9e0"),
      new Enemy("SnailTail", 10580, 100, 11070, 100, "#14c38e"),
    ];
    this.fireFlower = [new FireFlower({ x: 700, y: 121 })];
    this.win = [
      new Win({ image: "flag", x: 13440 + 20, y: 75 }),
      new Win({ image: "flagPole", x: 13440 - 2, y: 65 }),
    ];
    this.animationId = 0;
    this.projectiles = [];
    this.particles = [];
    this.scrollOffset = 0;

    this.music.gameOverByEnemy.pause();
    this.music.completeLevel.currentTime = 0;
    this.music.completeLevel.pause();
    this.conditions = [false, false];
  }

  render() {
    this.animationId = requestAnimationFrame(() => this.render());
    c.fillStyle = "rgba(255, 255, 255, 0.8)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    this.genericObjects.forEach((genericObject) => {
      genericObject.draw(c);
    });
    this.particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        this.particles.slice(index, 1);
      } else {
        particle.update(c);
      }
    });
    this.platforms.forEach((platform) => {
      platform.draw(c);
    });

    this.fireFlower.forEach((flower) => {
      flower.update(c);
    });
    this.projectiles.forEach((projectile, index) => {
      projectile.update(c);
      if (
        projectile.x - projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y - projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        setTimeout(() => {
          this.projectiles.splice(index, 1);
        }, 0);
      }
    });
    this.enemies.forEach((enemy) => {
      enemy.update(c, canvas);
    });
    this.win.forEach((w) => {
      w.draw(c);
    });

    this.player.update(c, canvas);

    this.enemies.forEach((enemy) => {
      enemy.move();
    });

    //   key usage area
    this.scrollOffset = this.player.move(
      this.platforms,
      this.scrollOffset,
      this.genericObjects,
      this.enemies,
      this.fireFlower,
      this.win,
      this.particles
    );
    if (this.player.keyboard.keys.up.pressed) {
      this.music.jump.play();
    }
    //   collision area
    this.projectiles.forEach((projectile) => {
      projectile.collision(this.platforms, this.enemies);
      if (projectile.markedForDeletion) {
        this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
      }
    });
    this.enemies.forEach((enemy) => {
      enemy.collision(this.platforms);
    });
    this.conditions = this.player.collision(
      this.endGame,
      this.platforms,
      this.enemies,
      this.fireFlower
    );
    // Enemy Deletion
    this.enemies.forEach((enemy) => {
      if (enemy.markedForDeletion) {
        this.music.enemySquash.currentTime = 0;
        this.music.enemySquash.play();
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        for (let i = 0; i < 100; i++) {
          this.particles.push(
            new Particle(
              enemy.currentPosition.x + enemy.width / 2,
              enemy.currentPosition.y + enemy.height / 2,
              Math.random() * 5,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6),
              }
            )
          );
        }
      }
    });

    this.fireFlower.forEach((flower) => {
      if (flower.markedForDeletion) {
        this.fireFlower.splice(this.fireFlower.indexOf(flower), 1);
      }
    });

    console.log(this.conditions[1]);
    if (this.conditions[1] === true) {
      this.fireFlowerAbility = true;
    }

    //   win area
    if (this.scrollOffset > 13000) {
      for (let i = 0; i < 10; i++) {
        this.particles.push(
          new Particle(
            this.win[0].position.x + this.win[0].width / 2 - 200,
            this.win[0].position.y + this.win[0].height / 2,
            Math.random() * 5,
            `hsl(${Math.random() * 360}, 50%, 50%)`,
            {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: (Math.random() - 0.5) * (Math.random() * 6),
            }
          )
        );
        this.particles.push(
          new Particle(
            this.win[0].position.x + this.win[0].width / 2 + 200,
            this.win[0].position.y + this.win[0].height / 2,
            Math.random() * 5,
            `hsl(${Math.random() * 360}, 50%, 50%)`,
            {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: (Math.random() - 0.5) * (Math.random() * 6),
            }
          )
        );
        this.particles.push(
          new Particle(
            this.win[0].position.x + this.win[0].width / 2 - 200,
            this.win[0].position.y + this.win[0].height / 2 + 200,
            Math.random() * 5,
            `hsl(${Math.random() * 360}, 50%, 50%)`,
            {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: (Math.random() - 0.5) * (Math.random() * 6),
            }
          )
        );
        this.particles.push(
          new Particle(
            this.win[0].position.x + this.win[0].width / 2 + 200,
            this.win[0].position.y + this.win[0].height / 2 + 200,
            Math.random() * 5,
            `hsl(${Math.random() * 360}, 50%, 50%)`,
            {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: (Math.random() - 0.5) * (Math.random() * 6),
            }
          )
        );
      }
      this.music.fireworkBurst.play();
      this.music.completeLevel.play();
      this.music.backgroundMusic.pause();
      this.won();
    }
    //  lose condition
    else if (
      this.player.position.y > canvas.height ||
      this.conditions[0] === true
    ) {
      this.endGame = false;
      cancelAnimationFrame(this.animationId);
      this.music.gameOverByEnemy.currentTime = 0;
      this.music.gameOverByEnemy.play();
      this.music.backgroundMusic.pause();
      startGameBtn.innerHTML = "Restart Game";
      modalEl.style.display = "flex";
    }
  }

  createImage(imageSrc) {
    const image = new Image();
    image.src = `./assets/${imageSrc}.png`;
    return image;
  }
  won() {
    startGameBtn.innerHTML = "Replay Game";
    modalEl.style.display = "flex";
  }
}
