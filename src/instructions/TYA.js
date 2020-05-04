import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function TYA() {
  cpu.Accumulator = cpu.RegY;
  setZNFlags(cpu.Accumulator);
}

export default TYA;
