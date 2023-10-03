import React, {useEffect} from 'react';
import Form from "../components/Form";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const nav = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('TOKEN')) {
            nav('lobby');
        }
    }, []);
    
    return (
        <div className="page">
            <h1>WELCOME TO BATTLE GAME</h1>
            <Form page={'Login'}/>
        </div>
    );
};

export default LoginPage;