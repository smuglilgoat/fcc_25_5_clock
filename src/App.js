import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25,
      secLeft: 0,
      break: false,
      running: false,
      intervalID: "",
    };

    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
    this.decrement = this.decrement.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  handleInc(e) {
    if (!this.state.running) {
      switch (e.target.id) {
        case "break-increment":
          if (this.state.breakLength < 60) {
            this.setState({ breakLength: this.state.breakLength + 1 });
            if (this.state.break) {
              this.setState({ timeLeft: this.state.breakLength + 1 });
            }
          }
          this.setState({ secLeft: 0 });
          break;
        case "session-increment":
          if (this.state.sessionLength < 60) {
            this.setState({ sessionLength: this.state.sessionLength + 1 });
            if (!this.state.break) {
              this.setState({ timeLeft: this.state.sessionLength + 1 });
            }
          }
          this.setState({ secLeft: 0 });
          break;
        default:
          break;
      }
    }
  }

  handleDec(e) {
    if (!this.state.running) {
      switch (e.target.id) {
        case "break-decrement":
          if (this.state.breakLength > 1) {
            this.setState({ breakLength: this.state.breakLength - 1 });
            if (this.state.break) {
              this.setState({ timeLeft: this.state.breakLength - 1 });
            }
          }
          this.setState({ secLeft: 0 });
          break;
        case "session-decrement":
          if (this.state.sessionLength > 1) {
            this.setState({ sessionLength: this.state.sessionLength - 1 });
            if (!this.state.break) {
              this.setState({ timeLeft: this.state.sessionLength - 1 });
            }
          }
          this.setState({ secLeft: 0 });
          break;
        default:
          break;
      }
    }
  }

  handleReset() {
    if (!this.state.intervalID == "") {
      clearInterval(this.state.intervalID);
      this.setState({ intervalID: "" });
      this.setState({ running: false });
    }
    this.setState({ breakLength: 5 });
    this.setState({ sessionLength: 25 });
    this.setState({ timeLeft: 25 });
    this.setState({ secLeft: 0 });
    this.setState({ break: false });
    let key = document.getElementById("beep");
    key.currentTime = 0;
    key.pause()
  }

  handleStartPause() {
    if (this.state.intervalID === "") {
      this.setState({ intervalID: setInterval(this.decrement, 1000) });
      this.setState({ running: true });
    } else {
      clearInterval(this.state.intervalID);
      this.setState({ intervalID: "" });
      this.setState({ running: false });
    }
  }

  decrement() {
    if (this.state.secLeft === 0) {
      this.setState({ secLeft: 59 });
      if (this.state.timeLeft === 0) {
        if (!this.state.break) {
          this.setState({ timeLeft: this.state.breakLength });
          this.setState({ secLeft: 0 });
          this.setState({ break: true });
          this.playAudio();
        } else {
          this.setState({ timeLeft: this.state.sessionLength });
          this.setState({ secLeft: 0 });
          this.setState({ break: false });
          this.playAudio();
        }
      } else {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
      }
    } else {
      this.setState({ secLeft: this.state.secLeft - 1 });
    }
  }

  playAudio() {
    let key = document.getElementById("beep");
    key.currentTime = 0;
    let playPromise = key.play();
    if (playPromise !== undefined) {
      playPromise
        .then(function () {})
        .catch(function (error) {
          console.log("failed");
        });
    }
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
                  <Card.Header id="timer-label">
                    {this.state.break ? "Break" : "Session"}
                  </Card.Header>
                  <Card.Body id="time-left">
                    {this.state.timeLeft < 10
                      ? "0" + this.state.timeLeft
                      : this.state.timeLeft}
                    :
                    {this.state.secLeft < 10
                      ? "0" + this.state.secLeft
                      : this.state.secLeft}
                    <audio
                      id="beep"
                      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                    />
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="outline-secondary"
                      size="lg"
                      style={{ marginRight: "1em" }}
                      id="start_stop"
                      onClick={this.handleStartPause}
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
