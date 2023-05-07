import KeyBoard from "./Keyboard.js";
import Particle from "./Particle.js";

export default class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 10;
    this.width = 66;
    this.height = 150;
    this.gravity = 0.5;
    this.keyboard = new KeyBoard();
    this.frames = 0;
    this.death = false;
    this.normalSprites = {
      stand: {
        right: this.fetchSprite("/normalMove/spriteStandRight"),
        left: this.fetchSprite("/normalMove/spriteStandLeft"),
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: this.fetchSprite("/normalMove/spriteRunRight"),
        left: this.fetchSprite("/normalMove/spriteRunLeft"),
        cropWidth: 341,
        width: 127.875,
      },
      jump: {
        right: this.fetchSprite("/normalMove/spriteJumpRight"),
        left: this.fetchSprite("/normalMove/spriteJumpLeft"),
        cropWidth: 258,
        width: 100,
      },
      death: this.fetchSprite("/normalMove/spriteDeath"),
    };
    this.ateFireFlower = false;
    this.superSprites = {
      stand: {
        right: this.fetchSprite("/FireFlowerPower/spriteFireFlowerStandRight"),
        left: this.fetchSprite("/FireFlowerPower/spriteFireFlowerStandLeft"),
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: this.fetchSprite("/FireFlowerPower/spriteFireFlowerRunRight"),
        left: this.fetchSprite("/FireFlowerPower/spriteFireFlowerRunLeft"),
        cropWidth: 341,
        width: 127.875,
      },
      jump: {
        right: this.fetchSprite("/FireFlowerPower/spriteFireFlowerJumpRight"),
        left: this.fetchSprite("/FireFlowerPower/spriteFireFlowerJumpLeft"),
        cropWidth: 258,
        width: 100,
      },
    };
    this.currentSprite = this.normalSprites.stand.right;
    this.currentCropWidth = this.normalSprites.stand.cropWidth;
  }

  fetchSprite(imageSrc) {
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
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update(c, canvas) {
    this.frames++;
    if (
      this.frames > 59 &&
      (this.currentSprite === this.normalSprites.stand.right ||
        this.currentSprite === this.normalSprites.stand.left ||
        this.currentSprite === this.superSprites.stand.left ||
        this.currentSprite === this.superSprites.stand.right)
    ) {
      this.frames = 0;
    } else if (
      this.frames > 29 &&
      (this.currentSprite === this.normalSprites.run.right ||
        this.currentSprite === this.normalSprites.run.left ||
        this.currentSprite === this.superSprites.run.left ||
        this.currentSprite === this.superSprites.run.right)
    ) {
      this.frames = 0;
    } else if (
      this.frames > 1 &&
      (this.currentSprite === this.normalSprites.jump.right ||
        this.currentSprite === this.normalSprites.jump.left ||
        this.currentSprite === this.superSprites.jump.left ||
        this.currentSprite === this.superSprites.jump.right)
    ) {
      this.frames = 0;
    }

    this.position.y += this.velocity.y;
    this.draw(c);
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += this.gravity;
    }

    if (this.death) {
      this.velocity.x = 0;
      this.position.y += 10;
    }
  }
  move(
    platforms,
    scrollOffset,
    genericObjects,
    enemies,
    fireFlower,
    winObj,
    particles
  ) {
    if (
      this.keyboard.keys.right.pressed &&
      this.position.x < 400 &&
      !this.keyboard.keys.left.pressed
    ) {
      this.velocity.x = this.speed;
    } else if (
      (this.keyboard.keys.left.pressed &&
        this.position.x > 100 &&
        !this.keyboard.keys.right.pressed) ||
      (this.keyboard.keys.left.pressed &&
        scrollOffset === 0 &&
        this.position.x > 0 &&
        !this.keyboard.keys.right.pressed)
    ) {
      this.velocity.x = -this.speed;
    } else {
      this.velocity.x = 0;
      if (
        this.keyboard.keys.right.pressed &&
        !this.keyboard.keys.left.pressed
      ) {
        scrollOffset += this.speed;
        platforms.forEach((platform) => {
          platform.position.x -= this.speed;
        });
        genericObjects.forEach((genericObject) => {
          genericObject.position.x -= this.speed * 0.66;
        });
        fireFlower.forEach((flower) => {
          flower.position.x -= this.speed;
        });
        winObj.forEach((win) => {
          win.position.x -= this.speed;
        });
        particles.forEach((particle) => {
          particle.x -= this.speed;
        });
        enemies.forEach((enemy) => {
          enemy.positions.start.x -= this.speed;
          enemy.positions.end.x -= this.speed;
          enemy.currentPosition.x -= this.speed;
        });
      } else if (
        this.keyboard.keys.left.pressed &&
        scrollOffset > 0 &&
        !this.keyboard.keys.right.pressed
      ) {
        scrollOffset -= this.speed;
        platforms.forEach((platform) => {
          platform.position.x += this.speed;
        });
        genericObjects.forEach((genericObject) => {
          genericObject.position.x += this.speed * 0.66;
        });
        fireFlower.forEach((flower) => {
          flower.position.x += this.speed;
        });
        winObj.forEach((win) => {
          win.position.x += this.speed;
        });
        particles.forEach((particle) => {
          particle.x += this.speed;
        });
        enemies.forEach((enemy) => {
          enemy.currentPosition.x += this.speed;
          enemy.positions.start.x += this.speed;
          enemy.positions.end.x += this.speed;
        });
      }
    }

    // sprite animation changes to different sprites here
    if (this.ateFireFlower) {
      if (
        !this.keyboard.keys.left.pressed &&
        this.keyboard.keys.right.pressed &&
        this.keyboard.lastKey === "right" &&
        this.currentSprite !== this.superSprites.run.right
      ) {
        this.frames = 1;
        this.currentSprite = this.superSprites.run.right;
        this.currentCropWidth = this.superSprites.run.cropWidth;
        this.width = this.superSprites.run.width;
      } else if (
        !this.keyboard.keys.right.pressed &&
        this.keyboard.keys.left.pressed &&
        this.keyboard.lastKey === "left" &&
        this.currentSprite !== this.superSprites.run.left
      ) {
        this.frames = 1;
        this.currentSprite = this.superSprites.run.left;
        this.currentCropWidth = this.superSprites.run.cropWidth;
        this.width = this.superSprites.run.width;
      } else if (
        !this.keyboard.keys.right.pressed &&
        !this.keyboard.keys.left.pressed &&
        this.keyboard.lastKey === "right" &&
        this.currentSprite !== this.superSprites.stand.right
      ) {
        this.frames = 1;
        this.currentSprite = this.superSprites.stand.right;
        this.currentCropWidth = this.superSprites.stand.cropWidth;
        this.width = this.superSprites.stand.width;
      } else if (
        !this.keyboard.keys.left.pressed &&
        !this.keyboard.keys.right.pressed &&
        this.keyboard.lastKey === "left" &&
        this.currentSprite !== this.superSprites.stand.right
      ) {
        this.frames = 1;
        this.currentSprite = this.superSprites.stand.left;
        this.currentCropWidth = this.superSprites.stand.cropWidth;
        this.width = this.superSprites.stand.width;
      }

      if (this.keyboard.keys.up.pressed && this.keyboard.keys.right.pressed) {
        this.currentSprite = this.superSprites.jump.right;
        this.currentCropWidth = this.superSprites.jump.cropWidth;
        this.width = this.superSprites.jump.width;
      } else if (
        this.keyboard.keys.up.pressed &&
        this.keyboard.keys.left.pressed
      ) {
        this.currentSprite = this.superSprites.jump.left;
        this.currentCropWidth = this.superSprites.jump.cropWidth;
        this.width = this.superSprites.jump.width;
      }
    } else {
      if (
        !this.keyboard.keys.left.pressed &&
        this.keyboard.keys.right.pressed &&
        this.keyboard.lastKey === "right" &&
        this.currentSprite !== this.normalSprites.run.right
      ) {
        this.frames = 1;
        this.currentSprite = this.normalSprites.run.right;
        this.currentCropWidth = this.normalSprites.run.cropWidth;
        this.width = this.normalSprites.run.width;
      } else if (
        !this.keyboard.keys.right.pressed &&
        this.keyboard.keys.left.pressed &&
        this.keyboard.lastKey === "left" &&
        this.currentSprite !== this.normalSprites.run.left
      ) {
        this.frames = 1;
        this.currentSprite = this.normalSprites.run.left;
        this.currentCropWidth = this.normalSprites.run.cropWidth;
        this.width = this.normalSprites.run.width;
      } else if (
        !this.keyboard.keys.right.pressed &&
        !this.keyboard.keys.left.pressed &&
        this.keyboard.lastKey === "right" &&
        this.currentSprite !== this.normalSprites.stand.right
      ) {
        this.frames = 1;
        this.currentSprite = this.normalSprites.stand.right;
        this.currentCropWidth = this.normalSprites.stand.cropWidth;
        this.width = this.normalSprites.stand.width;
      } else if (
        !this.keyboard.keys.left.pressed &&
        !this.keyboard.keys.right.pressed &&
        this.keyboard.lastKey === "left" &&
        this.currentSprite !== this.normalSprites.stand.right
      ) {
        this.frames = 1;
        this.currentSprite = this.normalSprites.stand.left;
        this.currentCropWidth = this.normalSprites.stand.cropWidth;
        this.width = this.normalSprites.stand.width;
      }

      if (this.keyboard.keys.up.pressed && this.keyboard.keys.right.pressed) {
        this.currentSprite = this.normalSprites.jump.right;
        this.currentCropWidth = this.normalSprites.jump.cropWidth;
        this.width = this.normalSprites.jump.width;
      } else if (
        this.keyboard.keys.up.pressed &&
        this.keyboard.keys.left.pressed
      ) {
        this.currentSprite = this.normalSprites.jump.left;
        this.currentCropWidth = this.normalSprites.jump.cropWidth;
        this.width = this.normalSprites.jump.width;
      }
    }

    return scrollOffset;
  }

  collision(endGame, platforms, enemies, fireFlower) {
    platforms.forEach((platform) => {
      // on platform
      if (
        this.position.y + this.height <= platform.position.y &&
        this.position.y + this.height + this.velocity.y >=
          platform.position.y &&
        this.position.x + this.width >= platform.position.x &&
        this.position.x <= platform.position.x + platform.width
      ) {
        this.velocity.y = 0;
      }

      // on bottom of platform
      if (
        this.position.y >= platform.position.y + platform.height &&
        this.position.y + this.velocity.y <=
          platform.position.y + platform.height &&
        this.position.x + this.width >= platform.position.x &&
        this.position.x <= platform.position.x + platform.width
      ) {
        this.velocity.y += 10;
      }

      if (
        this.position.x <= platform.position.x + platform.width &&
        this.position.x + this.normalSprites.run.width + this.velocity.x >=
          platform.position.x &&
        this.position.y + this.height >= platform.position.y &&
        this.position.y <= platform.position.y + platform.height
      ) {
        this.velocity.x -= 10;
      }
      // on left side of platform
      if (
        this.position.x >= platform.position.x + platform.width &&
        this.position.x + this.velocity.x <=
          platform.position.x + platform.width &&
        this.position.y <= platform.position.y + platform.height &&
        this.position.y + this.height >= platform.position.y
      ) {
        this.velocity.x += 10;
      }
    });
    enemies.forEach((enemy) => {
      // on platform
      if (
        this.position.y + this.height - 7 <= enemy.currentPosition.y &&
        this.position.y + this.height + this.velocity.y >=
          enemy.currentPosition.y &&
        this.position.x + this.width >= enemy.currentPosition.x &&
        this.position.x <= enemy.currentPosition.x + enemy.width
      ) {
        enemy.velocity.x = 0;
        enemy.markedForDeletion = true;
      }
      // on right side of platform
      if (
        this.position.x <= enemy.currentPosition.x + enemy.width &&
        this.position.x + this.normalSprites.run.width + this.velocity.x + 2 >=
          enemy.currentPosition.x &&
        this.position.y + this.height >= enemy.currentPosition.y &&
        this.position.y <= enemy.currentPosition.y + enemy.height
      ) {
        this.ateFireFlower = false;
        this.velocity.x = 0;
        this.currentSprite = this.normalSprites.death;
        this.currentCropWidth = this.normalSprites.stand.cropWidth;
        this.death = true;
        endGame = true;
      }

      // on left side of platform
      if (
        this.position.x >= enemy.currentPosition.x + enemy.width &&
        this.position.x + this.velocity.x - 2 <=
          enemy.currentPosition.x + enemy.width &&
        this.position.y <= enemy.currentPosition.y + enemy.height &&
        this.position.y + this.height >= enemy.currentPosition.y
      ) {
        this.ateFireFlower = false;
        this.velocity.x = 0;
        this.currentSprite = this.normalSprites.death;
        this.currentCropWidth = this.normalSprites.stand.cropWidth;
        this.death = true;
        endGame = true;
      }
    });

    fireFlower.forEach((flower) => {
      // on platform
      if (
        this.position.y + this.height <= flower.position.y &&
        this.position.y + this.height + this.velocity.y >= flower.position.y &&
        this.position.x + this.width >= flower.position.x &&
        this.position.x <= flower.position.x + flower.width
      ) {
        flower.markedForDeletion = true;
        this.ateFireFlower = true;
      }

      // on right side of platform
      if (
        this.position.x <= flower.position.x + flower.width &&
        this.position.x + this.normalSprites.run.width + this.velocity.x >=
          flower.position.x &&
        this.position.y + this.height >= flower.position.y &&
        this.position.y <= flower.position.y + flower.height
      ) {
        flower.markedForDeletion = true;
        this.ateFireFlower = true;
      }

      // // on left side of platform
      if (
        this.position.x >= flower.position.x + flower.width &&
        this.position.x + this.velocity.x <= flower.position.x + flower.width &&
        this.position.y <= flower.position.y + flower.height &&
        this.position.y + this.height >= flower.position.y
      ) {
        flower.markedForDeletion = true;
        this.ateFireFlower = true;
      }
    });
    return [endGame, this.ateFireFlower];
  }
}
