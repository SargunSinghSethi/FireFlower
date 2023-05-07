export default class Enemy {
  constructor(name, x1, y1, x2, y2, color) {
    this.positions = {
      start: {
        x: x1,
        y: y1,
      },
      end: {
        x: x2,
        y: y2,
      },
    };
    this.currentPosition = {
      x: this.positions.start.x,
      y: this.positions.start.y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.color = color;
    this.speed = 2;
    this.width = 100;
    this.height = 90;
    this.gravity = 0.5;
    this.frames = 0;
    this.enemyName = name;
    this.sprites = {};
    this.choose();
    this.currentSprite = this.sprites.enemy.run.left;
    this.currentCropWidth = this.sprites.enemy.cropWidth;
    this.currentCropHeight = this.sprites.enemy.cropHeight;
    this.markedForDeletion = false;
  }
  choose() {
    if (this.enemyName === "SnailTail") {
      this.sprites = {
        enemy: {
          run: {
            right: this.fetchEnemySprite(`/enemies/SnailTailRight`),
            left: this.fetchEnemySprite(`/enemies/SnailTailLeft`),
          },
          cropWidth: 533,
          width: 66,
          cropHeight: 388,
        },
      };
    } else if (this.enemyName === "bee") {
      this.sprites = {
        enemy: {
          run: {
            right: this.fetchEnemySprite("/enemies/beeRight"),
            left: this.fetchEnemySprite("/enemies/beeLeft"),
          },
          cropWidth: 273,
          width: 66,
          cropHeight: 282,
        },
      };
    } else if (this.enemyName === "blueBat") {
      this.sprites = {
        enemy: {
          run: {
            right: this.fetchEnemySprite("/enemies/blueBatRight"),
            left: this.fetchEnemySprite("/enemies/blueBatLeft"),
          },
          cropWidth: 473,
          width: 66,
          cropHeight: 468,
        },
      };
    }
  }
  fetchEnemySprite(imageSrc) {
    const sprites = new Image();
    sprites.src = `./assets/${imageSrc}.png`;
    return sprites;
  }

  draw(c) {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      this.currentCropHeight,
      this.currentPosition.x,
      this.currentPosition.y,
      this.width,
      this.height
    );
  }
  update(c, canvas) {
    this.frames++;
    if (
      this.frames > 9 &&
      (this.currentSprite === this.sprites.enemy.run.right ||
        this.currentSprite === this.sprites.enemy.run.left)
    ) {
      this.frames = 0;
    }
    this.currentPosition.y += this.velocity.y;
    this.velocity.y += this.gravity;
    this.draw(c);
    this.currentPosition.x += this.velocity.x;
    if (
      this.currentPosition.y + this.height + this.velocity.y <=
      canvas.height
    ) {
      this.velocity.y += this.gravity;
    }
  }

  collision(platforms) {
    platforms.forEach((platform) => {
      // on platform
      if (
        this.currentPosition.y + this.height - 7 <= platform.position.y &&
        this.currentPosition.y + this.height + this.velocity.y - 7 >=
          platform.position.y &&
        this.currentPosition.x + this.width >= platform.position.x &&
        this.currentPosition.x <= platform.position.x + platform.width
      ) {
        this.velocity.y = 0;
      }
    });
  }

  move() {
    if (this.currentPosition.x === this.positions.start.x) {
      this.velocity.x = this.speed;
      this.currentSprite = this.sprites.enemy.run.right;
    } else if (this.currentPosition.x === this.positions.end.x) {
      this.velocity.x = -this.speed;
      this.currentSprite = this.sprites.enemy.run.left;
    }
  }
}
