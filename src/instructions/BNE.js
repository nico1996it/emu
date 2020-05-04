import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";

function BNE() {
  if (cpu.Zero === 0) {
    var helper = new Int8Array(1);
    helper[0] = bus.value;
    cpu.ProgramCounter += helper[0];
  }
}

export default BNE;
