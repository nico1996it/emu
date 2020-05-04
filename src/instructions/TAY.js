import cpu from "../cpu/cpu";
import setZNFlags from "../helperFunctions";
function TAY(data) {
  cpu.RegY = cpu.Accumulator;
  setZNFlags(cpu.RegY);
}

export default TAY;
