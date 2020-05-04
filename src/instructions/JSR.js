import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function JSR() {
  var nextInst = cpu.ProgramCounter + 3 - 1;
  cpu.ProgramCounter = bus.adr - 3; //minus 3 beacuse the cpu step will increment of 3 (the size of jmp)

  bus.adr = cpu.StackPointer + 0x0100;

  bus.value = nextInst >> 8;
  cpu.StackPointer -= 1;

  bus.adr = cpu.StackPointer + 0x0100;
  bus.value = nextInst;
  cpu.StackPointer -= 1;
}

export default JSR;
