import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import SinglePlayer from "./SinglePlayer";
import {socket} from "../App";

const PlayersOnline = () => {

    const playersOnline = useSelector(state=>state.player.playersOnline);




    return (
        <div className="playersOnline">
            <div className="w-100">
                <h5>PLAYERS ONLINE</h5>
                {playersOnline.map((player,index) =>
                    <SinglePlayer key={index} player={player}/>
                )}
            </div>
        </div>
    );
};

export default PlayersOnline;