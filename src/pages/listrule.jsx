
import React, { useEffect, useState } from "react";
import image123 from './aa2.png';
import Spinner from "./spinner";



function ListRule() {
    const [ruleBookSelected, setRuleBookSelected] = useState('');
    const [res, setRes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ruleBook, setRuleBook] = useState([]);


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    useEffect(() => {
        fetch("http://localhost:8080/rules-engine/rules", requestOptions)
            .then(response => response.json())
            .then(result => { setRuleBook(result) })
            .catch(error => console.log('error', error));
    },[])




    // console.log(ruleBook);
    const arr = ruleBook.map(function name(e) {
        return e.ruleBook;
    })
    // console.log(arr);
    var newArray = arr.filter((value, index, self) => self.indexOf(value) === index);


    const handleClick_rule_book = (e) => {
        setIsLoading(true);
        e.preventDefault();
        // console.log(ruleBook);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/rules-engine/rules?rule_book=${ruleBookSelected}`, requestOptions)
            .then(response => response.json())
            .then(result => { setRes(result); setIsLoading(false) })
            .catch(error => { console.log('error', error); setIsLoading(false) });


    }
    let Table = () => {
        return (
            <div style={{ overflowX: 'auto' }}>
                <table className="table table-striped table-responsive-sm">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Rule Name</th>
                            <th>Rule Book</th>
                            <th>Description</th>
                            <th>Conditions</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {res.map((ele, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td>{ele.ruleId}</td>
                                    <td>{ele.ruleBook}</td>
                                    <td>{ele.description}</td>
                                    <td>{ele.condition}</td>
                                    <td>{ele.priority}</td>
                                    <td>{ele.actions}</td>
                                </tr>
                            )
                        })}



                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div className="container">
            <img
                src={image123}
                alt="avatar_img"
                style={{ height: '40px', width: 'auto' }}
            />

            <h2>Search Rule by RuleBook</h2>
            <form className="form">
                <div className="row">
                    <div className="col-3">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => { setRuleBookSelected(e.target.value) }}>
                            <option hidden>Select RuleBook</option>
                            {newArray.map((ele, ind) => {
                                return (

                                    <option key={ind + 1} value={ele}>{ele}</option>

                                )
                            })}




                            {/* <option hidden>Select RuleBook</option>
                            <option value="eligibility" >Eligibility</option>
                            <option value="test_rulebook">Test Rulebook</option>
                            <option value="pricing">Pricing</option> */}
                        </select>
                    </div>
                    <div className="col-1">
                        <button type="submit" style={{ width: 150 }} className="btn btn-primary" onClick={handleClick_rule_book}>Search</button>
                    </div>
                </div>
            </ form >
            {isLoading ? <Spinner /> : <Table />}
        </div>
    )

}



export default ListRule;