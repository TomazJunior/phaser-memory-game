import Phaser from 'phaser'
import Card from './Card';
import { images } from './imageUtils';
import { getRandomInt } from './util';

export default class GameScene {
  constructor() {
    this.cards = [];
    this.selectedCards = [];
    this.attempts = 0;
    this.waitForNewRound = false;
    this.score;
  }

  init() { }
  preload ()
  {
    this._loadCards();
    this._newRound();
  }
  
  _loadCards () {
    Object.keys(images)
    .map((name) => {
      this.load.image(name, images[name]);
    })
  }

  _cardClickHandler (card) {
    if (this.waitForNewRound || card.out) { return; }
    card.open();
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      this._newRound();
    }
  }

  _newRound() {
    this.waitForNewRound = true;
    setTimeout(() => {
      if (this._matchCards()) {
        this._setAsReadOnly();
      } else {
        this._closeCards();
      }
      this.selectedCards.length = 0;
      this.attempts++;
      this.waitForNewRound = false;
      this._updateScore();
    }, 1000);
  }

  _matchedCards() {
    return this.cards.filter((card) => card.out).length / 2;
  }

  _updateScore() {
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    if (!this.score) {
      this.score = this.add.text(0, 400, '', style);
    }
    const efficiency = this.attempts ? (this._matchedCards()/this.attempts*100).toFixed(0) : 0;

    this.score.text = `
      Attempts:${this.attempts}
      Matches: ${this._matchedCards()}
      Efficiency: ${efficiency}%
    `
  }

  _setAsReadOnly() {
    this.selectedCards.forEach((card) => card.readOnly());
  }

  _closeCards() {
    this.selectedCards.forEach((card) => card.close());
  }

  _matchCards () {
    if (!this.selectedCards.length) { return; }
    const cardA = this.selectedCards[0];
    const cardB = this.selectedCards[1];

    return cardA.key === cardB.key;
  }

  create ()
  {
    const MAX_CARD_PER_LINE = 4;
    const PAIRS = 4;
    const H_OFFSET = 200;
    const V_OFFSET = 200;
    const INITIAL_X = 70;
    const INITIAL_Y = 100;

    const lines = parseInt(PAIRS * 2 / MAX_CARD_PER_LINE) + ((PAIRS * 2 / MAX_CARD_PER_LINE % MAX_CARD_PER_LINE ? 1 : 0));
    const numberOfCards = PAIRS * 2;
    const positions = [];
    
    const imageNames = Object.keys(images)
    .filter((name) => {
      return name !== 'cover.png';
    }).slice(0, PAIRS);

    let total = numberOfCards;
    for (let line = 0; line < lines; line++) {
      for (let pos = 0; pos < MAX_CARD_PER_LINE; pos++) {
        if (total > 0) { 
          positions.push({
            x: INITIAL_X + (H_OFFSET * pos),
            y: INITIAL_Y + (V_OFFSET * line)
          })
        }
        total--;
      }
    }

    while (positions.length) {
      const posA = positions.splice(getRandomInt(positions.length), 1)[0];
      const posB = positions.splice(getRandomInt(positions.length), 1)[0];
      const key = imageNames.splice(getRandomInt(imageNames.length), 1)[0];
      this.cards.push(new Card( {key, gameScene: this, ...posA, handler: this._cardClickHandler.bind(this)} ));
      this.cards.push(new Card( {key, gameScene: this, ...posB, handler: this._cardClickHandler.bind(this)} ));
    }
    
  }
}