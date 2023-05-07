export default class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.shootPosition = y;
    this.markedForDeletion = false;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update(c) {
    this.draw(c);
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

  collision(platforms, enemies) {
    platforms.forEach((platform) => {
      // on platform
      if (
        this.y + this.radius * 2 - 10 >= platform.position.y &&
        this.y + 10 <= platform.position.y &&
        this.x + this.radius * 2 - 10 >= platform.position.x &&
        this.x <= platform.position.x + platform.width
      ) {
        this.velocity.y = -6;
      }
      if (this.y <= this.shootPosition) {
        this.velocity.y = 6;
      }
    });

    enemies.forEach((enemy) => {
      if (
        this.y + this.radius * 2 - 10 >= enemy.currentPosition.y &&
        this.y + 10 <= enemy.currentPosition.y + enemy.height &&
        this.x + this.radius * 2 - 10 >= enemy.currentPosition.x &&
        this.x <= enemy.currentPosition.x + enemy.width
      ) {
        enemy.velocity.x = 0;
        enemy.markedForDeletion = true;
        this.markedForDeletion = true;
      }
    });
  }
}
