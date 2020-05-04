import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
function JMP() {
  cpu.ProgramCounter = bus.adr - 3; //minus 3 beacuse the cpu step will increment of 3 (the size of jmp)
}

export default JMP;
