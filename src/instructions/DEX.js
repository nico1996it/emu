import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function DEX() {
  cpu.RegX -= 1;
  setZNFlags(cpu.RegX);
}

export default DEX;
