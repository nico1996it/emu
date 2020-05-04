import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function INX() {
  cpu.RegX += 1;
  setZNFlags(cpu.RegX);
}

export default INX;
