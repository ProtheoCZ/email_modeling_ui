import {Sigma, LoadJSON} from 'react-sigma';
import './App.css';
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {App} from "./App";

function App_old() {
    const style = {
        height: "1000px",
        width : "1800px"
    };

  return (
    <div>
      <h1 className="test">test app</h1>
       <Sigma style = {style}>
           <LoadJSON path = 'editedGraphBigger.json'></LoadJSON>
       </Sigma>
    </div>

  );
}

export default App_old;
