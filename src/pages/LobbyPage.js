import React, {useEffect} from 'react';
import NavBar from "../components/NavBar";
import ItemsGenerationCont from "../components/ItemsGenerationCont";
import Inventory_Equip_Cont from "../components/Inventory_Equip_Cont";
import PlayersOnline from "../components/PlayersOnline";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updatePlayer} from "../features/player";
import {socket} from "../App";

const LobbyPage = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const player = useSelector(state=>state.player.player);

    useEffect(() => {
        socket.auth = {
            token: localStorage.getItem('TOKEN')
        }
        socket.connect();
    }, []);

    useEffect(() => {

        if(localStorage.getItem('TOKEN')) {
            const options = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem('TOKEN')
                }
            }
            fetch('http://localhost:8000/getPlayerInfo', options)
                .then(res => res.json()).then(data => dispatch(updatePlayer(data.data)))
        }
        socket.emit('getAllUsersData');
    }, []);

    return (
        <>
            {player ?
                <div>
                    <NavBar/>
                    <div className="lobby">
                        <div className="leftSide">
                            <ItemsGenerationCont/>
                            <Inventory_Equip_Cont/>
                        </div>
                        <PlayersOnline/>
                    </div>
                </div>
                :
                <div className="page">
                    <h1 className="p-2">YOU NEED TO LOGIN TO BE ABLE TO PLAY</h1>
                    <button onClick={() => nav('/')}>GO TO LOGIN</button>
                </div>
            }

        </>

    );
};

export default LobbyPage;