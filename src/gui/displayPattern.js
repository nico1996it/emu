class displayPattern {
  ctx;
  init() {
    const canvas = document.getElementById("pixelCanvas");
    this.ctx = canvas.getContext("2d");
  }
  drawPixel(x, y, color) {
    if (color === 0) this.ctx.fillStyle = "red";
    if (color === 1) this.ctx.fillStyle = "red";
    if (color === 2) this.ctx.fillStyle = "black";
    if (color === 3) this.ctx.fillStyle = "green";
    this.ctx.fillRect(x, y, 1, 1);
  }
}

export default new displayPattern();
