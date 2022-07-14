import {Sigma, LoadJSON} from 'react-sigma';
import './App.css';
import React from "react";

function App() {
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

export default App;
