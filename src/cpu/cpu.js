import { observable } from "mobx";
import bus from "./cpuBus";
import step from "./step";
import setAddressingMode from "./setAddressingMode";
import RunIRQ from "./RunIRQ";
import RunNMI from "./RunNMI";

class cpu {
  registers = new Uint8Array(5);
  programCounter = new Uint16Array(1);

  constructor() {
    this.programCounter[0] = 0x0600;
    this.registers[0] = 0xff; //set the stack pointer
  }
  @observable registersView;
  @observable PcView;
  AddressMode;
  //flags
  Negative = 0;
  Overflow = 0;
  Break = 1;
  Decimal = 0;
  InterruptDisable = 1;
  Zero = 0;
  Carry = 0;

  IRQ_PENDING = false;
  NMI_PENDING = false;
  IRQ() {
    this.IRQ_PENDING = true;
  }
  NMI() {
    this.NMI_PENDING = true;
  }
  refreshMemoryView() {
    this.registersView = Array.prototype.slice.call(this.registers);
    this.PcView = Array.prototype.slice.call(this.programCounter);
  }
  get StackPointer() {
    return this.registers[0];
  }
  get Accumulator() {
    return this.registers[1];
  }
  get RegX() {
    return this.registers[2];
  }
  get RegY() {
    return this.registers[3];
  }
  get Status() {
    this.registers[4] = 0;
    this.registers[4] += this.Negative << 7;
    this.registers[4] += this.Overflow << 6;
    this.registers[4] += 1 << 5;
    this.registers[4] += this.Break << 4;
    this.registers[4] += this.Decimal << 3;
    this.registers[4] += this.InterruptDisable << 2;
    this.registers[4] += this.Zero << 1;
    this.registers[4] += this.Carry << 0;
    return this.registers[4];
  }
  get ProgramCounter() {
    return this.programCounter[0];
  }
  set Status(value) {
    this.registers[4] = value;

    this.Carry = this.registers[4] & 0x1 ? 1 : 0;
    this.Zero = this.registers[4] & 0x2 ? 1 : 0;
    this.InterruptDisable = this.registers[4] & 0x4 ? 1 : 0;
    this.Decimal = this.registers[4] & 0x8 ? 1 : 0;
    this.Overflow = this.registers[4] & 0x40 ? 1 : 0;
    this.Negative = this.registers[4] & 0x80 ? 1 : 0;
  }
  set StackPointer(value) {
    this.registers[0] = value;
  }
  set Accumulator(value) {
    this.registers[1] = value;
  }
  set RegX(value) {
    this.registers[2] = value;
  }
  set RegY(value) {
    this.registers[3] = value;
  }

  set ProgramCounter(value) {
    // console.log(value);
    this.programCounter[0] = value;
  }

  reset() {
    bus.adr = 0xfffc;
    var lsb = bus.value;
    bus.adr += 1;
    var msb = bus.value;
    this.ProgramCounter = (msb << 8) + lsb;
  }
}

cpu.prototype.step = step;
cpu.prototype.setAddressingMode = setAddressingMode;
cpu.prototype.RunIRQ = RunIRQ;
cpu.prototype.RunNMI = RunNMI;

export default new cpu();
