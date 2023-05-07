export default class KeyBoard {
  constructor() {
    this.keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
      up: {
        pressed: false,
      },
    };
  }

  keydown(key, player) {
    switch (key) {
      case "a":
        // console.log("left");
        this.keys.left.pressed = true;
        this.lastKey = "left";
        break;

      case "d":
        // console.log("right");
        this.keys.right.pressed = true;
        this.lastKey = "right";
        break;

      case "w":
        // console.log("up");
        player.velocity.y -= 26;
        this.keys.up.pressed = true;
        break;
    }
  }
  keyup(key) {
    switch (key) {
      case "a":
        // console.log("left");
        this.keys.left.pressed = false;
        break;

      case "d":
        this.keys.right.pressed = false;
        break;

      case "w":
        // console.log("up");
        this.keys.up.pressed = false;
        break;
    }
  }
}
