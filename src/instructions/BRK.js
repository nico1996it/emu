import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function BRK() {
  if (cpu.InterruptDisable === 0) {
    //check if the flag allow the interrupt
    //write on the stack
    bus.adr = cpu.StackPointer + 0x0100;
    bus.value = (cpu.ProgramCounter + 2) >> 8; //load msb
    cpu.StackPointer -= 1;
    bus.adr = cpu.StackPointer + 0x0100;
    bus.value = cpu.ProgramCounter + 2; //load lsb
    cpu.StackPointer -= 1;
    bus.adr = cpu.StackPointer + 0x0100;
    bus.value = cpu.Status; //load status byte
    cpu.StackPointer -= 1;

    //read the new program counter
    bus.adr = 0xfffe;
    var lsb = bus.value;
    bus.adr += 1;
    var msb = bus.value;
    cpu.ProgramCounter = (msb << 8) + lsb - 1; //-1 because it will be incremented on the next step
    cpu.InterruptDisable = 1;
  }
}

export default BRK;
