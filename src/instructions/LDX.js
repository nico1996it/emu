import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";
function LDX() {
  cpu.RegX = bus.value;
  setZNFlags(cpu.RegX);
}

export default LDX;
