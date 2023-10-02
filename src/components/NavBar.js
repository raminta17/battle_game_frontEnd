import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {socket} from "../App";

const NavBar = () => {

    const nav = useNavigate();
    const loggedPlayer = useSelector(state=>state.player.player);
    function handleLogOut() {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('auto-save')
        nav('/');
        socket.disconnect();
    }

    return (
        <div className="nav">
            <div className="d-flex align-items-center gap-3">
                <h1>WELCOME, {loggedPlayer.username}</h1>
                <div>
                    <img src={loggedPlayer.monster} alt=""/>
                </div>
                <b>Total wins: {loggedPlayer.victories}</b>
                <b>Total losses: {loggedPlayer.losses}</b>
            </div>
            <div onClick={handleLogOut}>LOG OUT</div>
        </div>
    );
};

export default NavBar;