import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function BRK() {
  if (cpu.InterruptDisable === 0) {
    //check if the flag allow the interrupt
    //write on the stack
    cpu.Break = 1;
    var newPc = cpu.ProgramCounter + 2;
    bus.adr = cpu.StackPointer + 0x0100;
    bus.value = newPc >> 8; //STORE msb
    cpu.StackPointer -= 1;
    bus.adr = cpu.StackPointer + 0x0100;
    bus.value = newPc; //STORE lsb
    cpu.StackPointer -= 1;
    bus.adr = cpu.StackPointer + 0x0100;
    bus.value = cpu.Status; //STORE status byte
    cpu.StackPointer -= 1;
    console.log(
      cpu.programCounter.toString(16),
      cpu.Status.toString(2),
      cpu.Negative
    );

    //read the new program counter
    cpu.InterruptDisable = 1;
    bus.adr = 0xfffe;
    var lsb = bus.value;
    bus.adr += 1;
    var msb = bus.value;
    cpu.ProgramCounter = (msb << 8) + lsb - 2; //-2 because it will be incremented by 2 on the next step
  }
}

export default BRK;
