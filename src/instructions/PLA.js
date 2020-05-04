import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function PLA() {
  cpu.StackPointer += 1;
  bus.adr = cpu.StackPointer + 0x0100;
  cpu.Accumulator = bus.value;
  setZNFlags(cpu.Accumulator);
}

export default PLA;
