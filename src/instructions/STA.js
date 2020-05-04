import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function STA() {
  bus.value = cpu.Accumulator;
}

export default STA;
