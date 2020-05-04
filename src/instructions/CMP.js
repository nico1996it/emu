import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function CMP() {
  var helper = new Int8Array(1);
  helper[0] = cpu.Accumulator - bus.value;
  setZNFlags(helper[0]);
  if (cpu.Accumulator >= bus.value) cpu.Carry = 1;
  else cpu.Carry = 0;
  if (cpu.Accumulator === bus.value) cpu.Zero = 1;
  else cpu.Zero = 0;
}

export default CMP;
