import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";
function LDY() {
  cpu.RegY = bus.value;
  setZNFlags(cpu.RegY);
}

export default LDY;
