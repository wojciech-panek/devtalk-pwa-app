import { Text, TextStyle } from 'pixi.js';

export class InterfaceText {
  constructor({ text, anchorX, x, y, font, fontSize, fontWeight, fillColor, uppercase }) {
    this._style = new TextStyle(this.setTextStyle(font, fontSize, fontWeight, fillColor, uppercase));
    this._stage = new Text(text, this.style);

    this.stage.anchor.set(anchorX, 0);
    this.stage.x = x;
    this.stage.y = y;
  }

  setTextStyle = (font, fontSize, fontWeight, fillColor) => {
    return {
      fontFamily: `${font}`,
      fontSize: fontSize,
      fontWeight: `${fontWeight}`,
      fill: `${fillColor}`,
    };
  };

  get stage() {
    return this._stage;
  }

  get style() {
    return this._style;
  }
}
