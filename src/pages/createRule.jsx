import React, { useRef, useState } from "react";
import Card from "./card";
import image123 from './aa2.png'
import OperatorButton from "./operatorButton";
import Multiselect from 'multiselect-react-dropdown';
import plansAndAddons from './plansAndAddons.json';
import Alert from "react-bootstrap/Alert";


function CreateRule() {
    const [ruleName, setRuleName] = useState('');
    const [description, setDescription] = useState('');
    const [action, setAction] = useState('');
    const [testAction, setTestAction] = useState('');
    const [filters, setFilters] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [conditions, setConditions] = useState([<Card name={0} key={0} />]);
    let myref = useRef();
    const handleAddCondition = () => {
        let len = conditions.length;
        setConditions([...conditions, <OperatorButton key={len} name={len} />, <Card key={len + 1} name={len} />]);
    }
    const handlePlansMultipleSelect = (e) =>{
        console.log({e});
        for(let i =0;i<e.length;i++){
            if(e[i].key == "all"){
                setFilters(plansAndAddons.plans)
                return;
            }
        }
        setFilters(e)
    }
    const handleAddonsMultipleSelect = (e) =>{
        for(let i =0;i<e.length;i++){
            if(e[i].key == "all"){
                setFilters(plansAndAddons.addons)
                return;
            }
        }
        setFilters(e)
    }

    function generateAns() {
        setErrorMessage('');
        setSuccessMessage('');
        let finalStr = '';
        let actionStr = '';
        let ans = '';
        actionStr = actionStr + "data.context = callbacks.filter" + action + "(data.context, [";
        filters.forEach((item, index) => {
            if (index != filters.length - 1)
                actionStr += `'${item.key}',`
            else
                actionStr += `'${item.key}'`
        })
        actionStr += testAction;
        actionStr += "])";
        // console.log(myref.current.childNodes);
        myref.current.childNodes.forEach(card => {

            if (card.classList.contains('card')) {
                let str = '(data.context.';
                card.childNodes[1].childNodes.forEach(element => {
                    if (element.classList.contains('inputFields')) {
                        element.childNodes[0].childNodes.forEach((e,index) => {
                            if(!(e.childNodes[0].value) || e.childNodes[0].value.length == 0){
                                // console.log({ee:e.childNodes[0].value.length,index});
                                if(index == 0){ setErrorMessage("Field is empty"); console.log(errorMessage); return; }
                                if(index == 1){ setErrorMessage("Field is empty"); return; }
                                if(index == 2){ setErrorMessage("Field is empty"); console.log(errorMessage); return; }
                                // console.log(errorMessage);
                            }
                            str += (e.childNodes[0].value + " ");
                        })
                    } else if (element.classList.contains('operator')) {
                        if (element.childNodes[0].childNodes[0].checked) {
                            str += ' || ';
                        } else if (element.childNodes[1].childNodes[0].checked) {
                            str += ' && ';
                        } else {
                            console.log("operator error");
                            // TODO: show error to user
                            setErrorMessage("Operator not selected")
                        }

                    }
                });
                str += " )"
                finalStr += str
            } else if (card.classList.contains('operator')) {
                if (card.childNodes[0].childNodes[0].checked) {
                    finalStr += ' || ';
                } else if (card.childNodes[1].childNodes[0].checked) {
                    finalStr += ' && ';
                } else {
                    // TODO: show error to user
                    console.log('error');
                    setErrorMessage("Operator not selected")
                }

            }
        });
       
        console.log({errorMessage});
        if(errorMessage && errorMessage.length > 0){
            return;
        } 
        console.log({finalStr});
        // console.log(ruleName);
        // console.log(description);
        console.log({actionStr});
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "ruleId": ruleName,
            "ruleBook": "test_rulebook",
            "isActive": true,
            "priority": 1,
            "errorCode": "PlansNotEligible",
            "errorMessage": "fail",
            "description": description,
            "condition": finalStr,
            "actions": [
                actionStr
            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/rules-engine/create", requestOptions)
            .then(response => response.json())
            .then(result =>{ 
                console.log("Response is ");
                console.log(result.error_code);
                    if(result.error_code=='INTERNAL_SERVER_ERROR'){
                        console.log("error code is Internal server error");
                        setErrorMessage("Field is empty");
                    }
                    else{
                        console.log("Response is "); console.log({result});setSuccessMessage("Rule has been added") 
                    }
                })
            .catch(error =>{setSuccessMessage(''); setErrorMessage(JSON.stringify(error))
        });
    }
    const handleCancle = () => {
        let n = conditions.length;
        if (n > 1) {
            setConditions(conditions.slice(0, n - 2))
        }
    }
    return (
        <div className="container">
            {successMessage!='' && <Alert variant="success">
                {successMessage}
            </Alert>}
            {errorMessage!='' && <Alert variant="danger">
                {errorMessage}
            </Alert>}
            <img
                src={image123}
                alt="avatar_img"
                style={{ height: '40px', width: 'auto' }}
            />

            <div className="row justify-content-center">
                <h1>For Auto Pricing Team</h1>
                <h2 >Create Rule</h2>
                <div className="col-10 row justify-content-center mt-2 mb-4">
                    <div className="col-6" style={{ paddingLeft: 0 }}>
                        <input className="new_input w-100" type="text" placeholder="Enter rule name" style={{ height: 40 }} value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
                    </div>
                    <div className="col-6" style={{ paddingRight: 0 }}>
                        <textarea className="new_input w-100" name="" id="" cols="30" rows="10" style={{ height: 40 }} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-10">
                    <div ref={myref}>
                        {conditions.map((e) => e)}
                    </div>
                    <div>
                        <button className="saveBut" onClick={() => handleAddCondition()}>Add Condition</button>
                    </div>
                    <div className="row justify-content-center mt-2 mb-4">
                        <div className="col-4">

                            <select className="form-select" aria-label="Default select example" onChange={(e) => { setAction(e.target.value) }}>
                                <option hidden>Select Action</option>
                                <option value="AddOns">Filter AddOns</option>
                                <option value="Plans">Filter Plans</option>
                            </select>
                        </div>
                        <div className="col-5" style={{ paddingLeft: 0 }}>
                            {/* <input className="new_input w-100" type="text" placeholder="Enter Array" style={{ height: 40 }} value={testAction} onChange={(e) => { setTestAction(e.target.value) }} /> */}


                            {action == "AddOns" && <Multiselect
                                displayValue="key"
                                groupBy="cat"
                                onKeyPressFn={function noRefCheck() { }}
                                onRemove={function noRefCheck(e) { setFilters(e) }}
                                onSearch={function noRefCheck() { }}
                                onSelect={handleAddonsMultipleSelect}
                                options={[{
                                    "key": "all"
                                }, ...plansAndAddons.addons]}
                                showCheckbox
                            />}
                            {action == "Plans" && <Multiselect
                                displayValue="key"
                                groupBy="cat"
                                onKeyPressFn={function noRefCheck() { }}
                                onRemove={function noRefCheck(e) { setFilters(e) }}
                                onSearch={function noRefCheck() { }}
                                onSelect={handlePlansMultipleSelect}
                                options={[{
                                    "key": "all"
                                }, ...plansAndAddons.plans]}
                                showCheckbox
                            />}

                        </div>


                    </div>
                    <div style={{ height: '150px', width: 'auto' }}>

                        <button className="cancelBut" onClick={() => { handleCancle() }}>Cancel</button>
                        <button className="saveBut" onClick={generateAns}>Save</button>

                    </div>

                </div>
            </div>
        </div>
    )


}

export default CreateRule;