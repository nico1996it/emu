import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function DEY() {
  cpu.RegY -= 1;
  setZNFlags(cpu.RegY);
}

export default DEY;
