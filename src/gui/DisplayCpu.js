import React from "react";
import cpu from "../cpu/cpu";
import bus from "../cpu/cpuBus";
import clock from "../clock";
import romLoader from "../memoryMappers/romLoader";
import displayPattern from "./displayPattern";
//cpu.refreshMemoryView();
window.clock = clock;
window.can = displayPattern;

class DisplayCpu extends React.Component {
  render() {
    return (
      <div>
        <input type="file" onChange={romLoader} />
        {/*     <p>
          {"A:"}
          {cpu.registersView[1].toString(16)}
          {" X:"}
          {cpu.registersView[2].toString(16)}
          {" Y:"}
          {cpu.registersView[3].toString(16)}
          {" SP:"}
          {cpu.registersView[0].toString(16)}
          {" PC:"}
          {cpu.PcView[0].toString(16)}
        </p>*/}
        <p>
          {"N:"}
          {cpu.Negative}
          {" V:"}
          {cpu.Overflow}
          {" B:"}
          {cpu.Break}
          {" D:"}
          {cpu.Decimal}
          {" I:"}
          {cpu.InterruptDisable}
          {" Z:"}
          {cpu.Zero}
          {" C:"}
          {cpu.Carry}
        </p>

        <p>
          {"Bus Address:"}
          {bus.address.toString(16)}
        </p>
      </div>
    );
  }
}

export default DisplayCpu;
