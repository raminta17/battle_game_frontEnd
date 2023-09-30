import React from 'react';
import {useSelector} from "react-redux";
import PlayerInBattleComp from "../components/PlayerInBattleComp";
import {socket} from "../App";

const GamePage = () => {

    const room = useSelector(state=>state.player.room);
    const loggedInPlayer = useSelector(state=>state.player.player);
    const player1 = room.players.find(player => player.username === loggedInPlayer.username);
    const player2 = room.players.find(player => player.username !== loggedInPlayer.username);
    const turn = useSelector(state=>state.player.room.turn);

    function handleFight() {
        socket.emit('turn', room.roomId);
    }

    return (
        <div className="page">
            <h1 className="m-1">WELCOME TO BATTLE</h1>
            <div className="arena">
                <PlayerInBattleComp player={player1}/>
                    {!room.gameOver ?
                        <div className="controls">
                        <b>It's <span className="moneySpan">{turn===loggedInPlayer.username? 'your' : turn}</span> turn</b>
                        {turn===loggedInPlayer.username && <button onClick={handleFight} className="hitBtn">HIT</button>}
                        </div>
                        :
                        <div className="controls text-light">
                            {room.winner === loggedInPlayer.username ?
                            <h3>Congratulations! You won {room.players.find(player => player.username === room.winner).winPot}$!</h3>
                                :
                                <h3>Sorry, you lost pal. Better luck next time!</h3>
                            }
                            <button>GO BACK TO LOBBY</button>
                        </div>
                    }


                <PlayerInBattleComp player={player2}/>
            </div>

        </div>
    );
};

export default GamePage;