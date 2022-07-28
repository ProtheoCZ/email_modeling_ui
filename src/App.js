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
            graphToRender : new Graph()
    })

    const selectDefaultMessage = "Select graph to display"

    function parseJsonGraph(graph){
    let loadedGraph = new Graph()

            for (let node of graph.nodes) {
                let nodeSize = node.size
                if (nodeSize >= 10) {
                    nodeSize = 10
                }

                loadedGraph.addNode(node.id, {
                    x: node.x,
                    y: node.y,
                    size: nodeSize,
                    color: node.color,
                    label: node.label
                })
            }

            for (let edge of graph.edges) {
                loadedGraph.addEdge(edge.source, edge.target, {color: edge.color, size: edge.size, id: edge.id})
            }

    return loadedGraph

}

   async function handleChange(event){
        const url = 'http://127.0.0.1:8000/emailModeling/getGraph/'
        let loadedGraph = new Graph()
        if(event.target.value !== selectDefaultMessage){
            console.log("if proc")
            await axios.post(url,event.target.value)
                .then(
                response =>{
                    console.log(response)
                    loadedGraph = parseJsonGraph(response.data)

                }
                )
                    .catch((err)=>{
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
                    <option>{selectDefaultMessage}</option>
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
            {/*<SigmaGraph graphToRender = {state.graphToRender}/>*/}
            <AlgorithmTriggerButton selectedGraph = {state.selectedGraph}/>
        </div>
    )
}