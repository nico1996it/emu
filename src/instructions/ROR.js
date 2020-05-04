import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function ROR() {
  var oldCarry = cpu.Carry;
  if (cpu.AddressMode === "Accumulator") {
    cpu.Carry = cpu.Accumulator & 0x01 ? 1 : 0;
    cpu.Accumulator = (cpu.Accumulator >> 1) + (oldCarry << 7);

    setZNFlags(cpu.Accumulator);
  } else {
    cpu.Carry = bus.value & 0x01 ? 1 : 0;
    bus.value = (bus.value >> 1) + (oldCarry << 7);
    setZNFlags(bus.value);
    if (cpu.Accumulator === 0) cpu.Zero = 1;
    else cpu.Zero = 0;
  }
}

export default ROR;
