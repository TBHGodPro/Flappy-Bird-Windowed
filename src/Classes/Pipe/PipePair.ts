import { BrowserWindow } from 'electron';
import Constants from '../Constants';
import { resolve } from 'path';
import { game } from '../..';

export default class PipePair {
  public done = false;

  public readonly gapTop: number;
  public readonly gapBottom: number;

  public top: BrowserWindow | null = null;
  public bottom: BrowserWindow | null = null;

  private lastUpdate = Date.now();
  public progress: number = 0;
  public get x() {
    return Math.max(Math.min(Math.round(Constants.width - this.progress * Constants.width), Constants.width), 0);
  }

  constructor(midPos: number) {
    this.gapBottom = midPos - game.pipeGapHeight / 2;
    this.gapTop = midPos + game.pipeGapHeight / 2;
  }

  public delete() {
    this.top?.hide();
    this.bottom?.hide();

    this.done = true;

    setTimeout(() => {
      this.top?.destroy();
      this.bottom?.destroy();
    }, 1000);
  }

  public create(force?: boolean) {
    if (this.top || this.bottom) {
      if (force) {
        this.top?.close();
        this.bottom?.close();
      } else return;
    }

    const topWin = new BrowserWindow({
      width: Constants.pipeWidthPX,
      height: Math.round(Constants.height - this.gapTop * Constants.height),
      x: this.x,
      y: 0,
      show: false,
      frame: false,
      resizable: false,
      transparent: Constants.transparency,
      hasShadow: !Constants.transparency,
    });
    this.top = topWin;

    this.top.loadFile(resolve(__dirname, '../../../public/html/pipe_top.html'));

    this.top.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        this.top?.show();
      }, 500);
    });

    this.top.on('closed', () => {
      if (this.top === topWin) this.top = null;
    });

    const bottomWin = new BrowserWindow({
      width: Constants.pipeWidthPX,
      height: Math.round(this.gapBottom * Constants.height),
      x: this.x,
      y: Math.round(Constants.height - this.gapBottom * Constants.height),
      show: false,
      frame: false,
      resizable: false,
      transparent: Constants.transparency,
      hasShadow: !Constants.transparency,
    });
    this.bottom = bottomWin;

    this.bottom.loadFile(resolve(__dirname, '../../../public/html/pipe_bottom.html'));

    this.bottom.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        this.bottom?.show();
      }, 500);
    });

    this.bottom.on('closed', () => {
      if (this.bottom === bottomWin) this.bottom = null;
    });
  }

  public render() {
    this.create();

    this.update();

    this.top!.setPosition(this.x, 0);
    this.bottom!.setPosition(this.x, Math.round(Constants.height - this.gapBottom * Constants.height));

    if (this.progress >= 1) this.delete();
  }

  public update() {
    const time = Date.now();

    this.progress += (time - this.lastUpdate) / game.speed;

    this.lastUpdate = time;
  }

  public getRect() {
    return {
      left: this.x + 25 + 40,
      right: this.x + Constants.pipeWidthPX - 25,
      centerX: this.x + Constants.pipeWidthPX / 2 - 12.5,
      width: Constants.pipeWidthPX,
      gap: {
        top: Constants.height - (this.gapBottom + 0.05) * Constants.height,
        bottom: Constants.height - (this.gapTop - 0.068) * Constants.height,
      },
    };
  }
}
