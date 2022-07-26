import {Button} from "react-bootstrap";
import axios from "axios";

export const AlgorithmTriggerButton = (props) => {

    const handleClick = () =>{
        const url = 'http://127.0.0.1:8000/emailModeling/getColoring/'

        axios.post(url,props.selectedGraph)
            .then(
                response =>{
                    console.log(response)
                }
            )
            .catch((error) =>
                console.log("graphList error " + error )
            )
    }

    return (
       <Button variant={'primary'} onClick={handleClick}>Trigger Algorithm</Button>
    )
}