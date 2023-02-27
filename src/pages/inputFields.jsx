import React from "react";
import data from "./data.json"

function InputFields() {
    
    const operators = ['<=', '>=', '==', '!=', 'in', 'contains'];
    let keysArr = Object.keys(data)
    return (
        <div className="inputFields row">
            <div className="col-12 row justify-content-between">
                <div className="col-4">
                    {/* <input className="stringInput" type="text" name="fname" id="" /> */}
                    <select style={{backgroundColor:"#582cdb", color :"white" ,height :50}} className="form-select">
                    <option value=""  hidden>Select an option...</option>
                        {
                            keysArr.map((key) => {
                                if (data[key] == null) {
                                    return (<option value={key}>{key}</option>)
                                } else {
                                    return (
                                        <optgroup label={key}>
                                            {Object.keys(data[key]).map((subKey)=>{
                                                return <option value={`${key}.${subKey}`}>{`${key}.${subKey}`}</option>
                                            })}
                                        </optgroup>
                                    )
                                }
                            })
                        }
                    </select>
                </div>
                <div className="col-4">

                    <select className="form-select" style={{height :50}}aria-label="Default select example">
                        <option hidden>Operator</option>

                        {operators.map((ele, ind) => {
                            return (

                                <option key={ind + 1} value={ele}>{ele}</option>

                            )
                        })}

                    </select>
                </div>
                <div className="col-4" >
                    <input style={{height :50}} className="stringInput w-100" type="text" name="value" id="" />
                </div>
            </div>
        </div>

    )


}
export default InputFields;