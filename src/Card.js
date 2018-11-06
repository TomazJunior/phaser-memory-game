
export default class Card {
  constructor({key, gameScene, x, y, handler}) {
    this.key = key;
    this.gameScene = gameScene;
    this.handler = handler;
    this.out = false;
    this._draw(x, y);
  }

  _draw(x, y) {
    this.cover = this.gameScene.add.sprite(x, y, 'cover.png').setInteractive();
    this.front = this.gameScene.add.sprite(x, y, this.key).setInteractive();

    this.cover.on('pointerdown', this._onClickHandler.bind(this));
    this.front.on('pointerdown', this._onClickHandler.bind(this));

    this.close();
  }

  readOnly () {
    this.out = true;
  }

  isVisible () {
    return this.front.visible;
  }

  close() {
    !this.out && 
      (this.front.visible = false);
  }

  open() {
    !this.out && 
      (this.front.visible = true);
  }

  _onClickHandler() {  
    this.handler(this);
  }
}