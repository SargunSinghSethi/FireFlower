export default class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw(c) {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
