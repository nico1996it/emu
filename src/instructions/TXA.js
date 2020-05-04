import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function TXA() {
  cpu.Accumulator = cpu.RegX;
  setZNFlags(cpu.Accumulator);
}

export default TXA;
