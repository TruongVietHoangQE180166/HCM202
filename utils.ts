
export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const checkCircleCollision = (x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) => {
  return getDistance(x1, y1, x2, y2) < r1 + r2;
};

export const getRandomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
};

export class ScreenShake {
  intensity = 0;
  decay = 0.9;

  shake(amount: number) {
    this.intensity = amount;
  }

  update() {
    this.intensity *= this.decay;
    if (this.intensity < 0.1) this.intensity = 0;
  }

  getOffsets() {
    if (this.intensity === 0) return { x: 0, y: 0 };
    return {
      x: (Math.random() - 0.5) * 2 * this.intensity,
      y: (Math.random() - 0.5) * 2 * this.intensity,
    };
  }
}
