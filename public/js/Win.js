export default class Win {
  constructor({ image, x, y }) {
    this.position = {
      x,
      y,
    };

    this.objName = image;
    this.obj = {};
    this.choose();
    this.width = 60;
    this.height = 80;
  }
  choose() {
    if (this.objName === "flag") {
      this.obj = {
        img: this.fetch("flag"),
        currentWidth: 144,
        currentHeight: 79,
        width: 60,
        height: 80,
      };
    } else if (this.objName === "flagPole") {
      this.obj = {
        img: this.fetch("flagPole"),
        currentWidth: 60,
        currentHeight: 700,
        width: 100,
      };
    }
  }

  fetch(imageSrc) {
    const sprites = new Image();
    sprites.src = `./assets/Win/${imageSrc}.png`;
    return sprites;
  }

  draw(c) {
    c.drawImage(this.obj.img, this.position.x, this.position.y);
  }
}
