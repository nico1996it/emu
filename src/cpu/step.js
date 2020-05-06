import bus from "./cpuBus";

import clock from "../clock";
import instructions from "../instructions/instructionsList";

function step() {
  clock.reset();
  bus.adr = this.ProgramCounter;
  var value = bus.value;
  var instruction = instructions[value];
  if (instruction === undefined) {
    console.log(value.toString(16));
  }
  //
  this.setAddressingMode(instruction.m); //set adressmode in cpu
  if (this.NMI_PENDING) {
    this.RunNMI();
    this.NMI_PENDING = false;
  } else if (this.IRQ_PENDING && this.InterruptDisable === 0) {
    this.RunIRQ();
    this.IRQ_PENDING = false;
    console.debug("IRQ");
  } else {
    /*   console.debug(
          this.ProgramCounter.toString(16),
          instruction.i.name,
          instruction.m
        );*/

    instruction.i();
    clock.increment(instruction.c);
    this.ProgramCounter += instruction.b;
  }

  //  this.refreshMemoryView();
  // cpuRam.refreshMemoryView();
}

export default step;
