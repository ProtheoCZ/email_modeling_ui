import React, {useEffect} from "react";
import axios from "axios";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import "@react-sigma/core/lib/react-sigma.min.css";

function parseJsonGraph(graph){
    let loadedGraph = new Graph()
    console.log(graph)

    for (let node of graph.nodes){
        let nodeSize = node.size
        if(nodeSize>=10){
            nodeSize = 10
        }

        loadedGraph.addNode(node.id,{x: node.x, y: node.y, size: nodeSize, color: node.color, label: node.label})
    }

    for (let edge of graph.edges){
        loadedGraph.addEdge(edge.source, edge.target, {color: edge.color, size: edge.size, id: edge.id})
    }

    return loadedGraph

}

export const LoadGraph = () =>{
    const loadGraph = useLoadGraph();

    const url = 'http://127.0.0.1:8000/emailModeling/getGraph/'
    useEffect(() => {
        axios.get(url)
            .then(
            response =>{
                console.log(response)
                loadGraph(parseJsonGraph(response.data))
            }
            ).catch((err)=>{
                console.log(err)
            }
            )
    },[loadGraph])

    return null;
}

export const SigmaGraph = ()=>{
        const style = {
        height: "1000px",
        width : "1800px"
    };

    return(
        <div>
            <h1>sigma test</h1>
            <SigmaContainer style={style}>
                <LoadGraph></LoadGraph>
            </SigmaContainer>
        </div>
    )
}


