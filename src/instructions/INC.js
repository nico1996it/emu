import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";
function INC() {
  bus.value += 1;
  setZNFlags(bus.value);
}

export default INC;
