import { observer } from "mobx-react";
import { observable } from "mobx";
import bus from "../cpu/cpuBus";
import React from "react";
import ram from "../cpu/cpuRam";
import cpu from "../cpu/cpu";
window.ram = ram;
window.bus = bus;
window.cpu = cpu;

class DisplayCpuRam extends React.Component {
  ClickAddress(e) {}
  render() {
    return (
      <div>
        <div className={"contCpuRam"}>
          <table className={"cpuRam"}>
            {/*  <tbody>
              {ram.memoryView.map((value, index) => {
                if (index % 16 === 0) {
                  return (
                    <tr>
                      <th id={index} onClick={this.ClickAddress}>
                        {ram.memoryView[index]}
                      </th>
                      <th id={index + 1} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 1]}
                      </th>
                      <th id={index + 2} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 2]}
                      </th>
                      <th id={index + 3} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 3]}
                      </th>
                      <th id={index + 4} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 4]}
                      </th>
                      <th id={index + 5} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 5]}
                      </th>
                      <th id={index + 6} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 6]}
                      </th>
                      <th id={index + 7} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 7]}
                      </th>
                      <th id={index + 8} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 8]}
                      </th>
                      <th id={index + 9} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 9]}
                      </th>
                      <th id={index + 10} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 10]}
                      </th>
                      <th id={index + 11} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 11]}
                      </th>
                      <th id={index + 12} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 12]}
                      </th>
                      <th id={index + 13} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 13]}
                      </th>
                      <th id={index + 14} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 14]}
                      </th>
                      <th id={index + 15} onClick={this.ClickAddress}>
                        {ram.memoryView[index + 15]}
                      </th>
                    </tr>
                  );
                }
              })}
            </tbody>*/}
          </table>
        </div>
      </div>
    );
  }
}
export default DisplayCpuRam;
