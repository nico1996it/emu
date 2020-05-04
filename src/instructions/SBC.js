import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import setZNFlags from "../helperFunctions";
function SBC() {
  var Accumulator = cpu.Accumulator;
  var Carry = cpu.Carry;
  //actual sum
  cpu.Accumulator = cpu.Accumulator - bus.value - (1 - Carry);

  setZNFlags(cpu.Accumulator);

  //set of the register carry
  var negArray = new Int8Array(2);
  var valueA = Accumulator;

  var valueB = bus.value;
  negArray[0] = Accumulator;
  negArray[1] = bus.value;

  var resultOverflow = valueA - valueB - (1 - Carry);
  //console.log(valueA, valueB, resultOverflow);
  if (resultOverflow > 255 || resultOverflow < 0) cpu.Carry = 0;
  else cpu.Carry = 1;

  //set of the register overflow/v
  valueA = negArray[0];
  valueB = negArray[1];
  resultOverflow = valueA - valueB - (1 - Carry);
  if (resultOverflow > 127 || resultOverflow < -128) cpu.Overflow = 1;
  else cpu.Overflow = 0;
}

export default SBC;
