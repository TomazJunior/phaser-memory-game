import Phaser from 'phaser'
import Card from './Card';
import { images } from './imageUtils';

export default class GameScene {
  constructor() {
    this.cards = [];
    this.selectedCards = [];
    this.round = 1;
  }

  init() { }
  preload ()
  {
      this._loadImages();
  }
  
  _loadImages () {
    Object.keys(images)
    .map((name) => {
      this.load.image(name, images[name]);
    })
  }

  create ()
  {
    let x = 70;
    let y = 100;
    Object.keys(images)
    .filter((name) => {
      return name !== 'cover.png';
    })
    .map((name, i) => {
      const card = new Card(name, this, x, y);
      x = x + 130;
      return card;
    })
  }



}