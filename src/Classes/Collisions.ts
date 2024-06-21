import Bird from './Bird';
import PipeGenerator from './Pipe/PipeGenerator';

export default class Collisions {
  public readonly bird: Bird;
  public readonly pipes: PipeGenerator;

  constructor(bird: Bird, pipes: PipeGenerator) {
    this.bird = bird;
    this.pipes = pipes;
  }

  public hasCollided(): boolean {
    const rect = this.bird.getRect();

    for (const pipe of this.pipes.pipes) {
      const box = pipe.getRect();

      if (rect.top <= box.gap.top && rect.bottom >= box.gap.bottom) continue;
      if (rect.right < box.left || rect.left > box.centerX) continue;
      return true;
    }

    return false;
  }
}
