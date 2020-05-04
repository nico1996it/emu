import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function RTI() {
  //import the status
  cpu.StackPointer += 1;
  bus.adr = cpu.StackPointer + 0x0100;
  cpu.Status = bus.value;

  //read the new program counter
  cpu.StackPointer += 1;
  bus.adr = cpu.StackPointer + 0x0100;
  var lsb = bus.value;
  cpu.StackPointer += 1;
  bus.adr = cpu.StackPointer + 0x0100;
  var msb = bus.value;
  cpu.ProgramCounter = (msb << 8) + lsb - 1; //-1 because it will be increment on the next step
}

export default RTI;
