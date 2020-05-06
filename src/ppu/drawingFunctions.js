import displayPattern from "../gui/displayPattern";

function getRow(row, patternPage, tile) {
  var offset = tile * 16 + row;
  if (patternPage === 1) {
    offset += 0x1000;
  }
  var planeA = this.memory[offset];
  var planeB = this.memory[offset + 0x8];
  var result = [0, 0, 0, 0, 0, 0, 0];

  for (var i = 7; i >= 0; i--) {
    var v = (planeA & 0b1 ? 1 : 0) + ((planeB & 0b1 ? 1 : 0) << 1);

    planeA = planeA >> 1;
    planeB = planeB >> 1;

    result[i] = v;
  }

  return result;
}

function drawRow(x, y, row) {
  row.map((value, index) => displayPattern.drawPixel(x + index, y, value));
}
function drawTile(x, y, number, page) {
  for (var i = 0; i < 8; i++) {
    drawRow(x, y + i, this.getRow(i, page, number));
  }
}
function drawTileLine(y, page) {
  for (var i = 0; i < 256 / 8; i++)
    this.drawTile(i * 8, y * 8, y * 32 + i, page);
}
function drawPage(page) {
  for (var i = 0; i < 256 / 8; i++) drawTileLine(i, page);
}

export default { drawTile, getRow };
