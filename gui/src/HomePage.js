import React, { Component } from "react";
import UncontrolledLottiie from "./UncontrolledLottiie";
import {
  GoogleLoginButton
} from "react-social-login-buttons";
import "./home.css";


class App extends Component {
  render() {
    return (
      // <Router>
        <div className="App" style={{height: "100vh", display: "flex", color: "white"}}>
          <div className="appAside">
            <div className="lottiie">
              <UncontrolledLottiie />
            </div>
          </div>
          <div className="appForm">
            <center>

              <h1 style={ {marginTop:"20%"}}>Ampersand</h1>

              <h3 style={ {marginTop:"5%", fontStyle:"italic"}}>- experience weather with us -</h3>


              <div style={ {marginTop:"20%", width:"250px"}}>
                <a id="loc" href=""><GoogleLoginButton/></a>
              </div>
            </center>

          </div>
        </div>
    );
  }
}

export default App;