import cpu from "../cpu/cpu";
import setZNFlags from "../helperFunctions";
function TSX() {
  cpu.RegX = cpu.StackPointer;
  setZNFlags(cpu.RegX);
}

export default TSX;
