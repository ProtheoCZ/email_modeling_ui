import {Button} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {AlgorithmGraph} from "./AlgorithmGraph";
import {SigmaGraph} from "./SigmaGraph";
import Graph from "graphology";

export const AlgorithmTriggerButton = (props) => {

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

    const [graphs,setGraphs] = useState([])
    const [displayedContent,setDisplayedContent] = useState(<h1>no graphs loaded</h1>)
    const [i,setI] = useState(-1)

    async function handleClick(){
        setI(0)
        const url = 'http://127.0.0.1:8000/emailModeling/getColoring/'
        await axios.post(url,props.selectedGraph)
            .then(
                response =>{
                    setGraphs(response.data.graphs)
                    console.log(response.data.graphs)
                    setDisplayedContent(<SigmaGraph graphToRender = {parseJsonGraph(response.data.graphs[0])}/>)
                    // setI(i+1)
                }
            )
            .catch((error) =>
                console.log("graphList error " + error )
            )

    }

    // function handleNextClick(){
    //     setDisplayedContent(<SigmaGraph graphToRender={parseJsonGraph(graphs[i])}>)
    // }
    function handleNextClick(){
        setI(i+1)
        setDisplayedContent(<SigmaGraph graphToRender = {parseJsonGraph(graphs[i+1])}/>)

    }

    function handlePrevClick(){
        setI(i-1)
        setDisplayedContent(<SigmaGraph graphToRender = {parseJsonGraph(graphs[i-1])}/>)
    }



    return (
        <div>
            <Button variant={'primary'} onClick={handleClick}>Trigger Algorithm</Button>
            <Button variant={'success'} onClick={handleNextClick} disabled={i<0 || i+1>= graphs.length}>next stage</Button>
            <Button variant={'danger'} onClick={handlePrevClick} disabled={i<=0}>previous stage</Button>
            <h1>{i+1}</h1>
            {/*<h1>{graphs.length}</h1>*/}
            {displayedContent}
        </div>
    )
}