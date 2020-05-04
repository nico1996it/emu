import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function PLP() {
  cpu.StackPointer += 1;
  bus.adr = cpu.StackPointer + 0x0100;
  cpu.Status = bus.value;
}

export default PLP;
