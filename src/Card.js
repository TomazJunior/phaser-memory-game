
export default class Card {
  constructor(key, gameScene, x, y) {
    this.key = key;
    this.cover = gameScene.add.sprite(x, y, 'cover.png').setInteractive();
    this.front = gameScene.add.sprite(x, y, key).setInteractive();

    this.cover.on('pointerdown', this._onClickHandler.bind(this));
    this.front.on('pointerdown', this._onClickHandler.bind(this));

    this.toggle();
  }

  toggle() {
    this._onClickHandler();
  }

  _onClickHandler() {
    this.front.visible = !this.front.visible;
  }
}