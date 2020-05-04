import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";

function STX() {
  bus.value = cpu.RegX;
}

export default STX;
