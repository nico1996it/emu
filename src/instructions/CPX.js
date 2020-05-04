import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function CPX() {
  var helper = new Int8Array(1);
  helper[0] = cpu.RegX - bus.value;
  setZNFlags(helper[0]);
  if (cpu.RegX >= bus.value) cpu.Carry = 1;
  else cpu.Carry = 0;
  if (cpu.RegX === bus.value) cpu.Zero = 1;
  else cpu.Zero = 0;
}

export default CPX;
