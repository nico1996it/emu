import bus from "./cpuBus";
import cpu from "./cpu";

function RunIRQ() {
  //check if the flag allow the interrupt
  //write on the stack
  bus.adr = cpu.StackPointer + 0x0100;
  bus.value = cpu.ProgramCounter >> 8; //load msb
  cpu.StackPointer -= 1;
  bus.adr = cpu.StackPointer + 0x0100;
  bus.value = cpu.ProgramCounter; //load lsb
  cpu.StackPointer -= 1;
  bus.adr = cpu.StackPointer + 0x0100;
  cpu.Break = 0; //set the break flag according to the IRQ Spec
  bus.value = cpu.Status; //load status byte
  cpu.Break = 1; //reset to one after the push on the stack
  cpu.StackPointer -= 1;

  //read the new program counter

  bus.adr = 0xfffe;
  var lsb = bus.value;
  bus.adr += 1;
  var msb = bus.value;
  cpu.ProgramCounter = (msb << 8) + lsb;
  cpu.InterruptDisable = 1;
}
export default RunIRQ;
