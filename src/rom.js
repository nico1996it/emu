const romToLoad =
  "a9 06 8d ff ff a9 10 8d fe ff a9 10 a9 11 a9 10 a9 11 a9 12 40 a9 13";

class Rom {
  memory = new Uint8Array(0x8000);
  constructor() {
    // this.loadRom();
  }

  loadRom() {
    //just for load from string
    var split = romToLoad.split(" ");
    split.map((value, index) => {
      this.memory[index] = parseInt("0x" + value);
    });
  }
  set size(value) {
    this.memory = new Uint8Array(value);
  }
}

export default new Rom();
