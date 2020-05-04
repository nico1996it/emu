import cpu from "../cpu/cpu";
import setZNFlags from "../helperFunctions";
function TAX(data) {
  cpu.RegX = cpu.Accumulator;
  setZNFlags(cpu.RegX);
}

export default TAX;
