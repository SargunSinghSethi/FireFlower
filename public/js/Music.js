export default class Music {
  constructor() {
    this.backgroundMusic = this.fetchMusic("backgroundMusic");
    this.completeLevel = this.fetchMusic("completeLevel");
    this.dieByFall = this.fetchMusic("dieByFall");
    this.enemySquash = this.fetchMusic("enemySquash");
    this.fireFlowerShot = this.fetchMusic("fireFlowerShot");
    this.gameOverByEnemy = this.fetchMusic("gameOverByEnemy");
    this.jump = this.fetchMusic("jump");
    this.fireworkBurst = this.fetchMusic("fireworkBurst");
  }

  fetchMusic(source) {
    const music = new Audio();
    music.src = `./audio/${source}.mp3`;
    return music;
  }
}
