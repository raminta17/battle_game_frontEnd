import React, {useEffect} from 'react';
import NavBar from "../components/NavBar";
import WeaponsCont from "../components/WeaponsCont";
import InventoryCont from "../components/InventoryCont";
import PlayersOnline from "../components/PlayersOnline";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updatePlayer} from "../features/player";

const LobbyPage = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const player = useSelector(state=>state.player.player);
    console.log('player in redux',player);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('auto-save'))) {
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

    }, []);

    return (
        <>
            {player ?
                <div>
                    <NavBar/>
                    <div className="lobby">
                        <div className="leftSide">
                            <WeaponsCont/>
                            <InventoryCont/>
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