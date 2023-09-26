import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const NavBar = () => {

    const nav = useNavigate();
    const loggedPlayer = useSelector(state=>state.player.player);
    console.log(loggedPlayer);
    function handleLogOut() {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('auto-save')
        nav('/')
    }

    return (
        <div className="nav">
            <div className="d-flex align-items-center gap-3">
                <h1>WELCOME, {loggedPlayer.username}</h1>
                <div>
                    <img src={loggedPlayer.monster} alt=""/>
                </div>
            </div>

            <div onClick={handleLogOut}>LOG OUT</div>
        </div>
    );
};

export default NavBar;