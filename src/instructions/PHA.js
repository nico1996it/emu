import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function PHA() {
  bus.adr = cpu.StackPointer + 0x0100;
  bus.value = cpu.Accumulator;
  cpu.StackPointer -= 1;
}

export default PHA;
