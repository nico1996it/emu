import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function LSR() {
  if (cpu.AddressMode === "Accumulator") {
    cpu.Carry = cpu.Accumulator & 0x01 ? 1 : 0;
    cpu.Accumulator /= 2;
    setZNFlags(cpu.Accumulator);
  } else {
    cpu.Carry = bus.value & 0x01 ? 1 : 0;
    bus.value /= 2;
    if (bus.value === 0) cpu.Zero = 1;
    else cpu.Zero = 0;
    cpu.Negative = bus.value & 0x80 ? 1 : 0;
  }
}

export default LSR;
