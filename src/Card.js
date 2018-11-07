
export default class Card {
  constructor({key, gameScene, x, y, handler}) {
    this.key = key;
    this.gameScene = gameScene;
    this.handler = handler;
    this.outOfTheGame = false;
    this._draw(x, y);
  }

  _draw(x, y) {
    this.cover = this.gameScene.add.sprite(x, y, 'cover.png').setInteractive();
    this.front = this.gameScene.add.sprite(x, y, this.key).setInteractive();

    this.cover.on('pointerdown', this._onClickHandler.bind(this));
    this.front.on('pointerdown', this._onClickHandler.bind(this));

    this.faceDown();
  }

  readOnly () {
    this.outOfTheGame = true;
  }

  isVisible () {
    return this.front.visible;
  }

  faceDown() {
    !this.outOfTheGame && 
      (this.front.visible = false);
  }

  faceUp() {
    !this.outOfTheGame && 
      (this.front.visible = true);
  }

  _onClickHandler() {  
    this.handler(this);
  }
}