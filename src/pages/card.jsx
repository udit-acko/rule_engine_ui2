import React, { useRef, useState } from "react";
import { ReactDOM } from "react";
import InputFields from "./inputFields";
import OperatorButton from "./operatorButton";
function Card(props) {
    const [conditions, setConditions] = useState([<InputFields key={0}/>]);
    const handleCancle = () =>{
        let n = conditions.length;
        if(n>1){
            setConditions(conditions.slice(0,n-2))
        }
    }
    // let myref = useRef();
    const handleButton = () => {
        let len = conditions.length;
        setConditions([...conditions, <OperatorButton key={len} name={`${props.name}-${len}`}/>, <InputFields key={len+1}/>]);
        // console.log(myref.current.childNodes);
    }
    // function addingString() {
    //     let str = '';
    //     myref.current.childNodes.forEach(element => {
    //         if (element.classList.contains('inputFields')) {
    //             element.childNodes[0].childNodes.forEach(e => {
    //                 str += (" "+e.childNodes[0].value + " ");
    //             })
    //         } else if (element.classList.contains('operator')) {
    //             if (element.childNodes[0].childNodes[0].checked) {
    //                 str += ' || ';
    //             } else if (element.childNodes[1].childNodes[0].checked){
    //                 str += ' && ';
    //             }else{
    //                 // TODO: show error to user
    //                 console.log("operator not selected");
    //             }

    //         }

    //     });
    //     console.log(str);
    // }


    return (
        <div className="card align-items-center w-100 card" >

            <h2 style={{ paddingTop: '10px', paddingBottom: "20px" }}>Condition</h2>

            <div className="w-100">
                {conditions.map((e) => e)}
            </div>

            <div className="row w-100 justify-content-end mt-4 mb-0">
            <button  style ={{borderRadius:"50%", width:50,height:50}} className="cancelBut col-1" onClick={()=>{handleCancle()}}>-</button>
            <button  style ={{borderRadius:"50%", width:50,height:50}}onClick={() => handleButton()} className="saveBut col-1" type="button">+</button>
                {/* <button onClick={() => addingString()}>temp</button> */}
            </div>


        </div>


    )



}

export default Card;