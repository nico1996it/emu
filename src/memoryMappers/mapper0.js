import rom from "../rom";
import romParser from "./romParser";
import ppu from "../ppu/ppu";
import cpuBus from "../cpu/cpuBus";
window.ppu = ppu;
class Mapper0 {
  LoadFromRom() {
    var sizePrgRom = romParser.PrgRomSize * 16384; //Because is in 16kib blocks
    rom.size = sizePrgRom;
    for (var i = 0; i < sizePrgRom; i++) {
      rom.memory[i] = romParser.view[i + 0x10];
    }
    var sizeChrRom = romParser.ChrRomSize * 8192; //Because is in 8kib blocks
    for (var i = 0; i < sizeChrRom; i++) {
      ppu.memory[i] = romParser.view[i + sizePrgRom];
    }
  }
}

export default new Mapper0();
