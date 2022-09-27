import {Button} from "react-bootstrap";
import axios from "axios";
import React,{useState} from "react";
import {SigmaGraph} from "./SigmaGraph";


export const AlgorithmTriggerButton = (props) => {

    const [graphs,setGraphs] = useState([])
    const [displayedContent,setDisplayedContent] = useState('')
    const [i,setI] = useState(-1)

    async function handleClick(){
        props.onVisibilityChange()
        setI(0)
        const url = 'http://127.0.0.1:8000/emailModeling/getColoring/'
        await axios.post(url,props.selectedGraph)
            .then(
                response =>{
                    setGraphs(response.data.graphs)
                    console.log(response.data.graphs)
                    setDisplayedContent(<SigmaGraph visibility = {true} graphToRender = {response.data.graphs[0]}/>)

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
            <Button variant={'primary'} onClick={handleClick}>Trigger Algorithm</Button>
            <Button variant={'success'} onClick={handleNextClick} disabled={i<0 || i+1>= graphs.length}>next stage</Button>
            <Button variant={'danger'} onClick={handlePrevClick} disabled={i<=0}>previous stage</Button>
            <h1>{i+1}</h1>
        </div>
    )
}