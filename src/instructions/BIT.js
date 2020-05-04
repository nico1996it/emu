import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";
function BIT() {
  if ((cpu.Accumulator & bus.value) === 0) cpu.Zero = 1;
  else cpu.Zero = 0;
  cpu.Overflow = bus.value & 0x40 ? 1 : 0;
  cpu.Negative = bus.value & 0x80 ? 1 : 0;
}

export default BIT;
