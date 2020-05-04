import Mapper0 from "./mapper0";
import displayPattern from "../gui/displayPattern";
class romParser {
  view;
  PrgRomSize; //16Kib blocks (16384)
  ChrRomSize; //8Kib blocks
  flag7;
  flag8;

  set rom(value) {
    displayPattern.init();
    this.view = new Int8Array(value);
    this.PrgRomSize = this.view[4];
    console.info("size", this.PrgRomSize);
    this.ChrRomSize = this.view[5];
    this.flag7 = this.view[7];
    this.flag8 = this.view[8];
    Mapper0.LoadFromRom();
  }
}

export default new romParser();
