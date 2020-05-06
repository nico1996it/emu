import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";

function ROL() {
  var oldCarry = cpu.Carry;
  if (cpu.AddressMode === "Accumulator") {
    cpu.Carry = cpu.Accumulator & 0x80 ? 1 : 0;
    cpu.Accumulator = (cpu.Accumulator << 1) + oldCarry;

    setZNFlags(cpu.Accumulator);
  } else {
    cpu.Carry = bus.value & 0x80 ? 1 : 0;
    bus.value = (bus.value << 1) + oldCarry;
    setZNFlags(bus.value);
  }
}

export default ROL;
