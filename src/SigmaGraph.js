import React, {useEffect, useState} from "react";
import axios from "axios";
import { SigmaContainer } from "@react-sigma/core";
import Graph from "graphology";
import "@react-sigma/core/lib/react-sigma.min.css";

// function parseJsonGraph(graph){
//     let loadedGraph = new Graph()
//
//     for (let node of graph.nodes){
//             let nodeSize = node.size
//             if(nodeSize>=10){
//                 nodeSize = 10
//             }
//
//         loadedGraph.addNode(node.id,{x: node.x, y: node.y, size: nodeSize, color: node.color, label: node.label})
//     }
//
//     for (let edge of graph.edges){
//         loadedGraph.addEdge(edge.source, edge.target, {color: edge.color, size: edge.size, id: edge.id})
//     }
//
//     return loadedGraph
//
// }


export const SigmaGraph = (props)=>{
    const style = {
        height: "720px",
        width : "1280px"
    };


    // const [graph, setGraph] = useState(new Graph())

    // const url = 'http://127.0.0.1:8000/emailModeling/getGraph/'

    // useEffect(() => {
        // if(props.selectedGraph !== undefined){
        //     axios.post(url,props.selectedGraph)
        //     .then(
        //     response =>{
        //         console.log(response)
        //         setGraph(parseJsonGraph(response.data))
        //     }
        //     ).catch((err)=>{
        //         console.log(err)
        //     }
        //     )
        //
        // }
    // },[props.selectedGraph])


    return(
        <div>
            <SigmaContainer style={style} graph={props.graphToRender}/>
        </div>
    )
}


