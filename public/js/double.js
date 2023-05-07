import KeyBoard from "./Keyboard.js";
// import SpriteSheet from "./SpriteSheet.js";

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
    // this.spriteSheet = new SpriteSheet();
    this.frames = 0;
    this.sprites = {
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
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = this.sprites.stand.cropWidth;
  }

  fetchSprite(imageSrc) {
    const sprites = new Image();
    sprites.src = `./assets/${imageSrc}.png`;
    return sprites;
  }

  draw(c) {
    c.drawImage(
      this.spriteSheet.currentSprite,
      this.spriteSheet.currentCropWidth * this.frames,
      0,
      this.spriteSheet.currentCropWidth,
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
      (this.spriteSheet.currentSprite ===
        this.spriteSheet.sprites.stand.right ||
        this.spriteSheet.currentSprite === this.spriteSheet.sprites.stand.left)
    ) {
      this.frames = 0;
    } else if (
      this.frames > 29 &&
      (this.spriteSheet.currentSprite === this.spriteSheet.sprites.run.right ||
        this.spriteSheet.currentSprite === this.spriteSheet.sprites.run.left)
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
  }
  move(platforms, scrollOffset, genericObjects) {
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
      }
    }

    // sprite animation changes to different sprites here
    if (
      !this.keyboard.keys.left.pressed &&
      this.keyboard.keys.right.pressed &&
      this.keyboard.lastKey === "right" &&
      this.spriteSheet.currentSprite !== this.spriteSheet.sprites.run.right
    ) {
      this.frames = 1;
      this.spriteSheet.currentSprite = this.spriteSheet.sprites.run.right;
      this.spriteSheet.currentCropWidth =
        this.spriteSheet.sprites.run.cropWidth;
      this.width = this.spriteSheet.sprites.run.width;
    } else if (
      !this.keyboard.keys.right.pressed &&
      this.keyboard.keys.left.pressed &&
      this.keyboard.lastKey === "left" &&
      this.spriteSheet.currentSprite !== this.spriteSheet.sprites.run.left
    ) {
      this.frames = 1;
      this.spriteSheet.currentSprite = this.spriteSheet.sprites.run.left;
      this.spriteSheet.currentCropWidth =
        this.spriteSheet.sprites.run.cropWidth;
      this.width = this.spriteSheet.sprites.run.width;
    } else if (
      !this.keyboard.keys.right.pressed &&
      !this.keyboard.keys.left.pressed &&
      this.keyboard.lastKey === "right" &&
      this.spriteSheet.currentSprite !== this.spriteSheet.sprites.stand.right
    ) {
      this.frames = 1;
      this.spriteSheet.currentSprite = this.spriteSheet.sprites.stand.right;
      this.spriteSheet.currentCropWidth =
        this.spriteSheet.sprites.stand.cropWidth;
      this.width = this.spriteSheet.sprites.stand.width;
    } else if (
      !this.keyboard.keys.left.pressed &&
      !this.keyboard.keys.right.pressed &&
      this.keyboard.lastKey === "left" &&
      this.spriteSheet.currentSprite !== this.spriteSheet.sprites.stand.right
    ) {
      this.frames = 1;
      this.spriteSheet.currentSprite = this.spriteSheet.sprites.stand.left;
      this.spriteSheet.currentCropWidth =
        this.spriteSheet.sprites.stand.cropWidth;
      this.width = this.spriteSheet.sprites.stand.width;
    }

    return scrollOffset;
  }

  collision(platforms) {
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
        this.velocity.y = 10;
      }

      // on right side of platform
      if (
        this.position.x <= platform.position.x + platform.width &&
        this.position.x +
          this.spriteSheet.sprites.run.width +
          this.velocity.x >=
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
        console.log("collide");
      }
    });
  }
}
