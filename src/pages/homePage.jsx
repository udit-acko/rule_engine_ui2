import React from "react";
import { ReactDOM } from "react";
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import image123 from './aa.png'


function HomePage() {

    const navigate = useNavigate();
    function handleClick() {
        navigate("/createrule");
    }
    function handleClickListRule() {
        navigate("/listrule");
    }



    return (


        <div className="container">
            <img
                src={image123}
                alt="avatar_img"
                style={{ height: '250px', width: 'auto' }}
            />
            <form className="form">

                <button style={{ backgroundColor: "#582cdb", color: "white" }} type="submit" onClick={handleClick}>Create Rule</button>
                <button type="submit" >Update Rule</button>
                <button type="submit" onClick={handleClickListRule}>List Rule</button>
                <button type="submit" >Exit</button>
            </form>


        </div>
    )
}

export default HomePage;