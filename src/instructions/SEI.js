import cpu from "../cpu/cpu";

function SEI() {
  cpu.InterruptDisable = 1;
}

export default SEI;
