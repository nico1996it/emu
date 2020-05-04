import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";

function STY() {
  bus.value = cpu.RegY;
}

export default STY;
