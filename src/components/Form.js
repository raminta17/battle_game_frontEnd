import React, {useState} from 'react';
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {updatePlayer} from "../features/player";

const Form = ({page, selectedMonsterIndex}) => {

    const usernameRef = useRef();
    const passRef = useRef();
    const repeatPassRef = useRef();
    const [error, setError] = useState();
    const nav = useNavigate();
    const dispatch = useDispatch();

    async function register() {
        if (!usernameRef.current.value) return setError('username cannot be empty')
        if (!passRef.current.value) return setError('password cannot be empty')
        if (passRef.current.value !== repeatPassRef.current.value) return setError('passwords should match');
        const player = {
            username: usernameRef.current.value,
            pass1: passRef.current.value,
            pass2: repeatPassRef.current.value,
            monster: selectedMonsterIndex
        }
        const options = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(player)
        }

        try {
            const res = await fetch('http://localhost:8000/register', options);
            const data = await res.json();
            setError(data.message);
            if (!data.error) {
                usernameRef.current.value = '';
                passRef.current.value = '';
                repeatPassRef.current.value = '';
                setError();
                nav('/');
            }
        } catch (e) {
            console.log('error', e)
        }
    }

    async function login() {
        if (!usernameRef.current.value) return setError('username cannot be empty');
        if (!passRef.current.value) return setError('password cannot be empty');
        const user = {
            username: usernameRef.current.value,
            password: passRef.current.value
        }
        const options = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
        try {
            const res = await fetch('http://localhost:8000/login', options);
            const data = await res.json();
            setError(data.message);
            if (!data.error) {
                localStorage.setItem('TOKEN', data.data.token);
                usernameRef.current.value = '';
                passRef.current.value = '';
                setError();
                dispatch(updatePlayer(data.data.findPlayer))
                nav('/lobby');
            }
        } catch (e) {
            console.log('error', e)
        }
    }

    return (
        <div className="box">
            <div className="error">{error}</div>
            <input type="text" ref={usernameRef} placeholder="Your username"/>
            <input type="password" ref={passRef} placeholder="Your password"/>
            {page === 'Register' &&
                <>
                    <input type="password" ref={repeatPassRef} placeholder="Repeat password"/>
                </>
            }
            <button onClick={page === 'Register' ? register : login}>{page}</button>
            {page === 'Login' ?
                <>
                    <div className="d-flex  justify-content-center gap-1" >
                    </div>
                    <div>Do not have an account? <Link to="/register" style={{textDecoration:'none'}}><span className="span" >Register</span></Link></div>
                </>
            :
                <div>
                    Already have an account? <Link to="/" style={{textDecoration:'none'}}><span className="span" >Login</span></Link>
                </div>
            }
        </div>
    );
};

export default Form;