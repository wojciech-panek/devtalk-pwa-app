import { Container, Texture, Sprite, Graphics } from 'pixi.js';

export class MenuButton {
  constructor({ x, y, width, height, icon, active, onClick }) {
    this._stage = new Container();
    this._width = width;
    this._height = height;
    this._stage.x = x;
    this._stage.y = y;

    this._active = active;
    this.background = new Graphics();

    this.setBackground();
    this.createIcon(icon, width, height);

    this.stage.addChild(this.background, this.icon);

    this._stage.interactive = true;
    this._stage.on('pointerdown', onClick);
  }

  createIcon(icon, width, height) {
    this.iconTexture = Texture.from(icon);
    this.icon = new Sprite(this.iconTexture);

    this.icon.anchor.set(0.5);
    this.icon.width = 30;
    this.icon.height = 30;
    this.icon.x = (width) / 2;
    this.icon.y = (height) / 2 - 5;
  }

  setBackground = () => {
    this.background.clear();
    this.background.beginFill(this.backgroundColor, 1);
    this.background.drawRect(0, 0, this._width, this._height);
    this.background.endFill();
  };

  get backgroundColor() {
    return this.active ? 0x46565e : 0x414149;
  }

  set active(value) {
    this._active = value;
    this.setBackground();
  }

  get active() {
    return this._active;
  }

  get stage() {
    return this._stage;
  }
}
