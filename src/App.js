import React, {useEffect, useState} from "react";
import axios from "axios";
import {SigmaGraph} from "./SigmaGraph";

import {Form} from "react-bootstrap";
import {AlgorithmTriggerButton} from "./AlgorithmTriggerButton";


export const App = () =>{
    const [state, setState] = useState({
            graphList :  undefined,
            selectedGraph: undefined
    })

    const handleChange = (event) => {
        setState({
            graphList: state.graphList,
            selectedGraph: event.target.value
        })
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
            <Form>
                <Form.Select onChange={(event)=>handleChange(event)}>
                    <option>Select graph to display</option>
                    {SelectContent}
                </Form.Select>
            </Form>
    }
    else {
        displayedContent = <h1>fail</h1>
    }

    return (
        <div>
            {displayedContent}
            <SigmaGraph selectedGraph = {state.selectedGraph}/>
            <AlgorithmTriggerButton selectedGraph = {state.selectedGraph}/>
        </div>
    )
}