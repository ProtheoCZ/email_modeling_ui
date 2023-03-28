import React, {useEffect, useState} from "react";
import axios from "axios";
import {SigmaGraph} from "./SigmaGraph";
import {Form} from "react-bootstrap";
import {AlgorithmTriggerButton} from "./AlgorithmTriggerButton";
import Graph from "graphology";



export const App = () =>{
    const [state, setState] = useState({
            graphList :  undefined,
            selectedGraph: undefined,
            graphToRender : undefined
    })

    const [visibility,setVisibility] = useState(true)

    const [renderGraph, setRenderGraph] = useState(true)

    function handleVisibilityChange() {
        setVisibility(false)
    }

    const selectDefaultMessage = "Select graph to display"


   async function handleChange(event){
        setVisibility(true)

        const url = 'http://127.0.0.1:8000/emailModeling/getGraph/'
        let loadedGraph = new Graph()

        if(event.target.value !== selectDefaultMessage  && renderGraph){

            await axios.post(url,event.target.value)
                .then(
                    response =>{
                        console.log(response)

                        loadedGraph = response.data
                    }
                )
                .catch(
                    (err)=>{
                        console.log(err)
                    }
                    )

            }

        setState({
            graphList: state.graphList,
            selectedGraph: event.target.value,
            graphToRender: loadedGraph
        })
    }

    function handleCheck(event){
        setRenderGraph(!renderGraph)
    }

    useEffect(() => {
        const getGraphList = () =>{
            const url = 'http://127.0.0.1:8000/emailModeling/getGraphList/'
            axios.get(url)
                .then(
                    response => {
                        setState({graphList : response.data.graphList })
                        console.log(state.graphList)
                        console.log(response.data.graphList)
                    }
                )
                .catch((error) =>
                console.log("graphList error " + error )
                )
        }
        getGraphList()

        },[]
    )

    let displayedContent

    if(Array.isArray(state.graphList) && state.graphList.length >= 0) {
        const SelectContent = state.graphList.map((graph,i) =>
            <option key={i} value={graph}>{graph}</option>
        )
        displayedContent =
            <Form className='form'>
                <Form.Select onChange={(event)=>handleChange(event)}>
                    <option>{selectDefaultMessage}</option>
                    {SelectContent}
                </Form.Select>
            </Form>
    }
    else {
        displayedContent = <h1>failed to load graph list</h1>
    }

    let displayedGraph
    if(renderGraph){
        displayedGraph = <SigmaGraph  visibility= {visibility} graphToRender = {state.graphToRender}/>
    }
    else{
        displayedGraph = <h1>Graph rendering disabled</h1>
    }

    return (
        <div>
            <div style={{flexDirection:'row',display:"flex"}}>
                {displayedContent}
                <p style={{fontSize: 22, marginLeft:"10px"}}>Do not render Graph:</p>
                <input
                    type="checkbox"
                    onChange={handleCheck}
                    style={{width: "30px", height:"30px", marginTop:"4px", marginLeft: "6px"}}
                />

            </div>
            {displayedGraph}
            <AlgorithmTriggerButton onVisibilityChange = {handleVisibilityChange} selectedGraph = {state.selectedGraph}/>
        </div>
    )
}