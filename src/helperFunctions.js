import bus from "./cpu/cpuBus";
import cpu from "./cpu/cpu";
function isNegative(value) {
  //check if is negative in signed 8bit range

  var check = new Int8Array(1);
  check[0] = value;
  return check[0] < 0;
}
function setZNFlags(value) {
  //check if is negative in signed 8bit range

  if (value == 0) cpu.Zero = 1;
  else cpu.Zero = 0;
  if ((value & 0b10000000) > 0) cpu.Negative = 1;
  else cpu.Negative = 0;
}
export default setZNFlags;
