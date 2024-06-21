import { screen } from 'electron';

class Constants {
  public readonly fps = -1; // -1 for unlimited

  public readonly display = screen.getPrimaryDisplay();
  public readonly bounds = this.display.bounds;
  public readonly width = this.bounds.width;
  public readonly height = this.bounds.height;
  public readonly offsetTopPX = 10;
  public readonly offsetBottomPX = 160;

  public readonly transparency = true;

  public readonly baseGameSpeed = 10_000;
  public readonly maxGameSpeed = 3_750;

  public readonly gravity = 0.0004;
  public readonly jump = 0.25;

  public readonly pipeWidthPX = 200;

  public readonly maxPipeDiff = 0.3;
  public readonly pipeSpacing = 0.4;
}

let constants: Constants;

export function setupConstants() {
  constants = new Constants();
  exports.default = constants;
}

export default constants!;
