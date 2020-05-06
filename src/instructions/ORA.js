import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";
function ORA() {
  cpu.Accumulator = cpu.Accumulator | bus.value;

  if (cpu.Accumulator == 0) cpu.Zero = 1;
  else cpu.Zero = 0;
  if ((cpu.Accumulator & 0b10000000) > 0) cpu.Negative = 1;
  else cpu.Negative = 0;
}

export default ORA;
