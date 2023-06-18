import React from "react";
import { SigmaContainer } from "@react-sigma/core";
import Graph from "graphology";
import "@react-sigma/core/lib/react-sigma.min.css";


function parseJsonGraph(graph){
    let loadedGraph = new Graph()
    if(graph !== undefined) {
        for (let node of graph.nodes) {
            let nodeSize = node.size
            if (nodeSize >= 10) {
                nodeSize = 10
            }

            loadedGraph.addNode(node.id, {x: node.x, y: node.y, size: nodeSize, color: node.color, label: node.label})
        }

        for (let edge of graph.edges) {
            loadedGraph.addEdge(edge.source, edge.target, {color: edge.color, size: edge.size, id: edge.id})
        }
    }

    return loadedGraph

}


export const SigmaGraph = (props)=>{
    const style = {
        height: "600px",
        width : "1920px"
    };



    let displayedContent = <SigmaContainer style={style} graph={parseJsonGraph(props.graphToRender)}/>
    if(!props.visibility){
        displayedContent = null
    }

    return(
        <div>
            {displayedContent}
        </div>
    )
}


