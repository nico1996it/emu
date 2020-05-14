import React from "react";
import DisplayCpuRam from "./gui/DisplayCpuRam";
import "./App.css";
import DisplayCpu from "./gui/DisplayCpu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Term from "./gui/term";
import cpuRam from "./cpu/cpuRam";
window.cpuRam = cpuRam;
function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <DisplayCpu />
            <canvas id={"pixelCanvas"} width={256} height={240} />
            <p>
              Controlli(Tastiera-<b>NES</b>):<br></br> Q-<b>A</b>, W-<b>B</b>,
              E-
              <b>SELECT</b>, R-<b>START</b>, Frecce Tastiera-
              <b>Frecce del NES</b>
            </p>
            <Term />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
