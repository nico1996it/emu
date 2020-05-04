import React from "react";
import DisplayCpuRam from "./gui/DisplayCpuRam";
import "./App.css";
import DisplayCpu from "./gui/DisplayCpu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Term from "./gui/term";
function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={6}>
            <DisplayCpuRam />
          </Col>
          <Col xs={6}>
            <DisplayCpu />
            <canvas id={"pixelCanvas"} width={256} height={240} />
            <Term />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
