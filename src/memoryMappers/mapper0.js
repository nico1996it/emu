import rom from "../rom";
import romParser from "./romParser";
import ppu from "../ppu/ppu";
import cpuBus from "../cpu/cpuBus";

window.ppu = ppu;
class Mapper0 {
  LoadFromRom() {
    var sizePrgRom = romParser.PrgRomSize * 16384; //Because is in 16kib blocks
    rom.size = sizePrgRom;
    //load the rom
    for (var i = 0; i < sizePrgRom; i++) {
      rom.memory[i] = romParser.view[i + 0x10];
    }

    //map the rom properly
    if (romParser.PrgRomSize === 2) {
      cpuBus.addressSpaces.push({
        bound: [0x8000, 0xffff],
        d: rom.memory,
      });
    } else {
      cpuBus.addressSpaces.push({
        bound: [0xc000, 0xffff],
        d: rom.memory,
      });
    }

    //load the chr memory  in the ppu memory
    var sizeChrRom = romParser.ChrRomSize * 8192; //Because is in 8kib blocks
    for (i = 0; i < sizeChrRom; i++) {
      ppu.memory[i] = romParser.view[i + 0x10 + sizePrgRom];
    }
  }
}

export default new Mapper0();
