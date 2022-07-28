// import {SigmaContainer} from "@react-sigma/core";
// import React, {useEffect} from "react";
// import Graph from "graphology";

//
// export const AlgorithmGraph = (props)=>{
    // function parseJson(graph){
    // let loadedGraph = new Graph()
    //
    // for (let node of graph.nodes){
    //         let nodeSize = node.size
    //         if(nodeSize>=10){
    //             nodeSize = 10
    //         }
    //
    //     loadedGraph.addNode(node.id,{x: node.x, y: node.y, size: nodeSize, color: node.color, label: node.label})
    // }
    //
    // for (let edge of graph.edges){
    //     loadedGraph.addEdge(edge.source, edge.target, {color: edge.color, size: edge.size, id: edge.id})
    // }
    //
    // return loadedGraph

//  }
//     const style = {
//         height: "720px",
//         width : "1280px"
//     };
//
//     useEffect(()=>(
//         console.log(props.graphsToRender.graphs[0])
//     ),[props.graphsToRender])
//
//     return(
//         <div>
//             <h1>algo test</h1>
//             <SigmaContainer style={style} graph={parseJson(props.graphsToRender.graphs[0])}/>
//         </div>
//     )
//
// }