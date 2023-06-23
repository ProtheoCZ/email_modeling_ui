import {Button} from "react-bootstrap";
import axios from "axios";
import React,{useState} from "react";
import {SigmaGraph} from "./SigmaGraph";
import config from "./config";

// const base_url = 'http://127.0.0.1:8000/emailModeling/'
const base_url = config.backendUrl + 'emailModeling/'
export const AlgorithmTriggerButton = (props) => {

    const [graphs,setGraphs] = useState([])
    const [displayedContent,setDisplayedContent] = useState('')
    const [i,setI] = useState(-1)

    async function handleClick(url){
        props.onVisibilityChange()
        setI(0)
        await axios.post(base_url + url,props.selectedGraph)
            .then(
                response =>{
                    setGraphs(response.data.graphs)
                    console.log(response.data.graphs)
                    if(response.data.compatible == 1) {
                        setDisplayedContent(<SigmaGraph visibility={true} graphToRender={response.data.graphs[0]}/>)
                    }
                    else{
                        setDisplayedContent(<h1>Graph is not compatible with selected algorithm</h1>)
                    }
                }
            )
            .catch((error) =>
                console.log("graphList error " + error )
            )

    }

    function handleNextClick(){
        setI(i+1)
        setDisplayedContent(<SigmaGraph visibility = {true} graphToRender = {graphs[i+1]}/>)
    }

    function handlePrevClick(){
        setI(i-1)
        setDisplayedContent(<SigmaGraph visibility = {true} graphToRender = {graphs[i-1]}/>)
    }



    return (
        <div>
            {displayedContent}
            <Button variant={'primary'} onClick={() => handleClick('getLnkColoring/')}>LNK Algorithm</Button>
            <Button variant={'primary'} onClick={() => handleClick('getFullSim/')}>Full LNK Simulation</Button>
            <br/>
            <Button variant={'warning'} onClick={() => handleClick('getRelatabilityColoring/')}>Relatability Algorithm</Button>
            <Button variant={'warning'} onClick={() => handleClick('getFullRelatabilitySim/')}>Full Relatability Sim</Button>
            <br/>
            <Button variant={'secondary'} onClick={() => handleClick('getGwTree/')}>Generate GW Tree</Button>
            <Button variant={'secondary'} onClick={() => handleClick('getFullGwSim/')}>Full GW Sim</Button>
            <br/>
            <Button variant={'info'} onClick={() => handleClick('getRumorSim/')}>Rumor Algorithm</Button>
            <Button variant={'info'} onClick={() => handleClick('getFullRumorSim/')}>Full Rumor Sim</Button>
            <br/>
            <Button variant={'success'} onClick={handleNextClick} disabled={i<0 || i+1>= graphs.length}>next stage</Button>
            <Button variant={'danger'} onClick={handlePrevClick} disabled={i<=0}>previous stage</Button>
            <h1>{i+1}</h1>
        </div>
    )
}