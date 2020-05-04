import cpu from "../cpu/cpu";
function TXS() {
  cpu.StackPointer = cpu.RegX;
}

export default TXS;
