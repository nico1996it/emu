import Mapper0 from "./mapper0";
import displayPattern from "../gui/displayPattern";
class romParser {
  view;
  PrgRomSize; //16Kib blocks (16384)
  ChrRomSize; //8Kib blocks

  set rom(value) {
    displayPattern.init();
    this.view = new Int8Array(value);
    this.PrgRomSize = this.view[4];
    this.ChrRomSize = this.view[5];
    this.flag6 = this.view[6];
    this.flag7 = this.view[7];
    this.flag8 = this.view[8];
    console.info("size", this.PrgRomSize);
    console.info(
      "mirroring:",
      this.flag6 & 0b0000001 ? "vertical" : "orizzontal"
    );

    Mapper0.LoadFromRom();
  }
}

export default new romParser();
