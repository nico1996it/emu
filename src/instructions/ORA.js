import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";
function ORA() {
  cpu.Accumulator = cpu.Accumulator | bus.value;

  setZNFlags(cpu.Accumulator);
}

export default ORA;
