export default class FireFlower {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };

    this.fireFlower = this.fetchFlower("/FireFlowerPower/spriteFireFlower");
    this.frames = 0;
    this.width = 60;
    this.height = 80;
    this.markedForDeletion = false;
  }

  fetchFlower(imageSrc) {
    const sprites = new Image();
    sprites.src = `./assets/${imageSrc}.png`;
    return sprites;
  }

  draw(c) {
    c.drawImage(
      this.fireFlower,
      56 * this.frames,
      0,
      56,
      60,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update(c) {
    this.frames++;
    if (this.frames > 75) this.frames = 0;
    this.draw(c);
  }
}
