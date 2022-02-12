import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25,
      break: false,
    };

    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleInc(e) {
    switch (e.target.id) {
      case "break-increment":
        if (this.state.breakLength < 60) {
          this.setState({ breakLength: this.state.breakLength + 1 });
          if (this.state.break) {
            this.setState({ timeLeft: this.state.breakLength + 1 });
          }
        }
        break;
      case "session-increment":
        if (this.state.sessionLength < 60) {
          this.setState({ sessionLength: this.state.sessionLength + 1 });
          if (!this.state.break) {
            this.setState({ timeLeft: this.state.sessionLength + 1 });
          }
        }
        break;
      default:
        break;
    }
  }

  handleDec(e) {
    switch (e.target.id) {
      case "break-decrement":
        if (this.state.breakLength > 0) {
          this.setState({ breakLength: this.state.breakLength - 1 });
          if (this.state.break) {
            this.setState({ timeLeft: this.state.breakLength - 1 });
          }
        }
        break;
      case "session-decrement":
        if (this.state.sessionLength > 0) {
          this.setState({ sessionLength: this.state.sessionLength - 1 });
          if (!this.state.break) {
            this.setState({ timeLeft: this.state.sessionLength - 1 });
          }
        }
        break;
      default:
        break;
    }
  }

  handleReset() {
    this.setState({ breakLength: 5 });
    this.setState({ sessionLength: 25 });
    this.setState({ timeLeft: 25 });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <Col>
                <Card border="light" bg="dark">
                  <Card.Header id="break-label">Break Length</Card.Header>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col>
                          <Button
                            variant="outline-secondary"
                            id="break-increment"
                            size="lg"
                            onClick={this.handleInc}
                          >
                            🔼
                          </Button>
                        </Col>
                        <Col id="break-length">{this.state.breakLength}</Col>
                        <Col>
                          <Button
                            variant="outline-secondary"
                            id="break-decrement"
                            size="lg"
                            onClick={this.handleDec}
                          >
                            🔽
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card border="light" bg="dark">
                  <Card.Header id="session-label">Session Length</Card.Header>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col>
                          <Button
                            variant="outline-secondary"
                            id="session-increment"
                            size="lg"
                            onClick={this.handleInc}
                          >
                            🔼
                          </Button>
                        </Col>
                        <Col id="session-length">
                          {this.state.sessionLength}
                        </Col>
                        <Col>
                          <Button
                            variant="outline-secondary"
                            id="session-decrement"
                            size="lg"
                            onClick={this.handleDec}
                          >
                            🔽
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: "1em" }}>
              <Col>
                <Card border="light" bg="dark">
                  <Card.Header id="timer-label">Session</Card.Header>
                  <Card.Body id="time-left">{this.state.timeLeft}</Card.Body>
                  <Card.Footer>
                    <Button
                      variant="outline-secondary"
                      size="lg"
                      style={{ marginRight: "1em" }}
                      id="start_stop"
                    >
                      ⏯
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="lg"
                      id="reset"
                      onClick={this.handleReset}
                    >
                      🔁
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
