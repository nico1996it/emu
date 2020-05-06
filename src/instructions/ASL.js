import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function ASL() {
  if (cpu.AddressMode === "Accumulator") {
    cpu.Carry = cpu.Accumulator & 0x80 ? 1 : 0;
    cpu.Accumulator *= 2;
    setZNFlags(cpu.Accumulator);
  } else {
    cpu.Carry = bus.value & 0x80 ? 1 : 0;

    bus.value *= 2;

    cpu.Negative = bus.value & 0x80 ? 1 : 0;
    cpu.Zero = bus.value == 0 ? 1 : 0;
  }
}

export default ASL;
