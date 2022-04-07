import React, { Component } from "react";
import UncontrolledLottiie from "./UncontrolledLottiie";
import {
  GoogleLoginButton
} from "react-social-login-buttons";
import "./home.css";

class App extends Component {
  
    render() {
      
    document.title = "Login Page"
    
    function go(){
      var name = document.getElementById("username").value;
      name = name.replace(" ", "")
      window.open( "/choice" + "/?username=" + name, "_self");
    }

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

              <div class="login">
              <div class="form">
              <h1 style={ {marginTop:"5%"}}>Ampersand</h1>

              <h3 style={ {marginTop:"5%", fontStyle:"italic", paddingBottom:"15%"}}>- experience weather with us -</h3>
                <input id="username" name="username" type="text" placeholder="Username"/>
                {/* <!-- <input type="password" placeholder="Password"> */}
                <input type="submit" value="Sign In as Guest" class="submit" onClick={go}/><br/><br/><br/>
                <span>---------------or---------------</span>
                <div style={ {marginTop:"10%", width:"250px", paddingBottom:"5%"}}>
                <a id="loc" href=""><GoogleLoginButton/></a>
              </div>
              </div>
              </div>
            </center>

          </div>
        </div>
    );
  }
}

export default App;