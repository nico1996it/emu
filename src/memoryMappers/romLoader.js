import rom from "../rom";
import romParser from "./romParser";

function romLoader(event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function () {
    romParser.rom = reader.result;
  };
  reader.readAsArrayBuffer(input.files[0]);
}
export default romLoader;
