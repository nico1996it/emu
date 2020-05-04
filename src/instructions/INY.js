import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function INY() {
  cpu.RegY += 1;
  setZNFlags(cpu.RegY);
}

export default INY;
