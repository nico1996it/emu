import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function RTS() {
  cpu.StackPointer += 1;
  bus.adr = cpu.StackPointer + 0x0100;
  var LSB = bus.value;
  cpu.StackPointer += 1;
  bus.adr = cpu.StackPointer + 0x0100;
  var MSB = bus.value;
  cpu.ProgramCounter = (MSB << 8) + LSB;
}

export default RTS;
