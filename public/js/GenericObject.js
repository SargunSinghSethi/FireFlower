export default class GenericObject {
  constructor({ x, y, image, width, height }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = width * 10;
    this.height = height * 2;
  }
  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
