import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function PHP() {
  bus.adr = cpu.StackPointer + 0x0100;
  bus.value = cpu.Status;
  cpu.StackPointer -= 1;
}

export default PHP;
