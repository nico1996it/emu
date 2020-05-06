import bus from "./cpuBus";
import cpu from "./cpu";
function setAddressingMode(type) {
  //c'è da aggiungere i clock sulla cpu se page cross
  var warpHelper = new Uint8Array(1);
  var warpHelper16 = new Uint16Array(1);
  cpu.AddressMode = type;
  switch (type) {
    case "Relative":
      bus.adr += 1;
      break;
    case "Implied":
      break;
    case "Accumulator":
      break;
    case "Immediate":
      bus.adr += 1;
      break;
    case "ZeroPage":
      bus.adr += 1;
      bus.adr = bus.value;

      break;
    case "ZeroPageX":
      bus.adr += 1;
      warpHelper[0] = bus.value + this.RegX;
      bus.adr = warpHelper[0];
      break;
    case "ZeroPageY":
      bus.adr += 1;
      warpHelper[0] = bus.value + this.RegY;
      bus.adr = warpHelper[0];
      break;
    case "Absolute":
      bus.adr += 1;
      var lsb = bus.value;
      bus.adr += 1;
      var msb = bus.value;
      bus.adr = (msb << 8) + lsb;

      break;
    case "AbsoluteX":
      bus.adr += 1;
      var lsb = bus.value;
      bus.adr += 1;
      var msb = bus.value;
      bus.adr = (msb << 8) + lsb + this.RegX;

      break;
    case "AbsoluteY":
      bus.adr += 1;
      var lsb = bus.value;
      bus.adr += 1;
      var msb = bus.value;
      bus.adr = (msb << 8) + lsb + this.RegY;
      break;
    case "Indirect":
      bus.adr += 1;
      bus.adr = bus.value;
      var lsb = bus.value;
      bus.adr += 1;
      var msb = bus.value;
      bus.adr = (msb << 8) + lsb;
      break;
    case "IndexedIndirect":
      bus.adr += 1;

      warpHelper[0] = bus.value + this.RegX;

      bus.adr = warpHelper[0];

      var lsb = bus.value;
      warpHelper[0] = bus.adr + 1;
      bus.adr = warpHelper[0];
      var msb = bus.value;
      bus.adr = (msb << 8) + lsb;

      break;
    case "IndirectIndexed":
      bus.adr += 1;
      bus.adr = bus.value;
      var lsb = bus.value;
      warpHelper[0] = bus.adr + 1;
      bus.adr = warpHelper[0];
      var msb = bus.value;
      warpHelper16[0] = (msb << 8) + lsb + this.RegY;
      bus.adr = warpHelper16[0];

      break;
    default:
      console.log("unknown addressMode", type);
  }
}
export default setAddressingMode;
