import { BrowserWindow } from 'electron';
import Constants from './Constants';
import { resolve } from 'path';

export default class Bird {
  public window: BrowserWindow | null = null;

  public get x() {
    return Math.round(0.1 * Constants.width);
  }
  public get y() {
    return Math.round(Constants.height - this.height * Constants.height);
  }

  public height: number = 0.5;

  public velo: number = 0;

  private lastUpdate = Date.now();

  constructor() {}

  public delete() {
    this.window?.close();
    this.window = null;
  }

  public create(force?: boolean) {
    if (this.window) {
      if (force) this.window.close();
      else return;
    }

    const win = new BrowserWindow({
      width: Math.round(0.05 * Constants.width * (409 / 289)),
      height: Math.round(0.05 * Constants.width),
      x: this.x,
      y: this.y,
      show: false,
      frame: false,
      resizable: false,
      transparent: Constants.transparency,
      hasShadow: !Constants.transparency,
    });
    this.window = win;

    this.window.loadFile(resolve(__dirname, '../../public/html/bird.html'));

    this.window.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        this.focus();
      }, 500);
    });

    this.window.on('closed', () => {
      if (this.window === win) this.window = null;
    });
  }

  public focus() {
    this.window?.show();
  }

  public render() {
    this.create();

    this.update();

    this.window!.setPosition(this.x, this.y);
  }

  public update() {
    const time = Date.now();

    this.velo -= Constants.gravity * (time - this.lastUpdate);
    if (this.velo > Constants.jump * 1.5) this.velo -= Constants.gravity * (time - this.lastUpdate);

    this.height += this.velo * ((time - this.lastUpdate) / 1000);

    this.lastUpdate = time;

    if (this.height <= 1e-3) this.height = 1e-3;
    if (this.height >= 1 - 1e-3) this.height = 1 - 1e-3;
  }

  public jump() {
    if (this.velo >= 0.5 * Constants.jump) this.velo += Constants.jump * 0.4;
    else this.velo = Constants.jump;

    // this.velo = Constants.jump;
  }

  public getRect() {
    return {
      left: this.x,
      top: this.y,
      right: this.x + Math.round(0.05 * Constants.width * (409 / 289)),
      bottom: this.y + Math.round(0.05 * Constants.width),
      width: Math.round(0.05 * Constants.width * (409 / 289)),
      height: Math.round(0.05 * Constants.width),
      center: {
        x: this.x + Math.round((0.05 * Constants.width * (409 / 289)) / 2),
        y: this.y + Math.round((0.05 * Constants.width) / 2),
      },
    };
  }
}
