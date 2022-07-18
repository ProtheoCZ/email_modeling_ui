import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";




export const GraphDropdown = () =>{
    const [graphList, setGraphList] = useState('')

    useEffect(() => {

        const getGraphList = () =>{
            const url = 'http://127.0.0.1:8000/emailModeling/getGraphList/'
            axios.get(url)
                .then(
                    response => {
                        setGraphList(response.data.graphList)
                        console.log(graphList)
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
    if(Array.isArray(graphList) && graphList.length >= 0) {
        const dropdownContent = graphList.map((graph,i) =>
            <Dropdown.Item key = {i}>{graph}</Dropdown.Item>
        )
        displayedContent = <Dropdown>
            {dropdownContent}
        </Dropdown>
    }
    else {
        displayedContent = <h1>fail</h1>
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Graph
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {displayedContent}
            </Dropdown.Menu>
        </Dropdown>
    )

    return <h1>test</h1>

}