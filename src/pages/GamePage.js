import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PlayerInBattleComp from "../components/PlayerInBattleComp";
import {socket} from "../App";
import {useNavigate} from "react-router-dom";
import {updateAbandoned, updatePlayer, updateRoom} from "../features/player";

const GamePage = () => {

    socket.connect();

    const nav = useNavigate();
    const dispatch = useDispatch();
    const room = useSelector(state => state.player.room);
    const abandoned = useSelector(state=>state.player.abandoned);
    const loggedInPlayer = useSelector(state => state.player.player);
    let player1= null;
    let player2= null;
    if(room) {
        player1 = room.players.find(player => player.username === loggedInPlayer.username);
        player2 = room.players.find(player => player.username !== loggedInPlayer.username);
    }

    function handleFight() {
        socket.emit('turn', room.roomId);
    }

    function leaveBattle() {
        socket.emit('leaveBattle', {roomId: room.roomId, username: loggedInPlayer.username});
        nav('/lobby');
        dispatch(updateRoom());
    }
    function playerLeftBattle() {
        socket.emit('playerLeftInTheMiddleOfBattle', room.roomId)
        nav('/lobby');
    }
    function leaveAfterBeingAbandoned() {
        socket.emit('leaveAfterBeingAbandoned', room.roomId);
        nav('/lobby');
        dispatch(updateAbandoned(false));
    }

    return (
        <>
            {room ?
                <div className="page">
                    <h1 className="m-1">WELCOME TO BATTLE</h1>
                    {!abandoned ?
                    <div className="arena">
                        <PlayerInBattleComp player={player1}/>
                        {!room.gameOver ?
                            <div className="controls">
                                <div></div>
                                <div className="gap20 d-flex flex-column">
                                    <b>It's <span
                                        className="moneySpan">{(room.turn && room.turn === loggedInPlayer.username) ? 'your' : room.turn}</span> turn</b>
                                    {(room.turn && room.turn === loggedInPlayer.username )&&
                                        <button onClick={handleFight} className="hitBtn">HIT</button>}
                                    {room.timer && <div className={room.timer <=5 ? 'dangerTimer' : 'timer'}>{room.timer}</div>}
                                </div>


                                    <div onClick={playerLeftBattle} className="leaveBtn">LEAVE BATTLE</div>

                            </div>
                            :
                            <div className="controls text-light justify-content-center">
                                {room.winner === loggedInPlayer.username ?
                                    <h3>Congratulations! You
                                        won {room.players.find(player => player.username === room.winner).winPot}$!</h3>
                                    :
                                    <h3>Sorry, you lost pal. Better luck next time!</h3>
                                }
                                <button className="hitBtn" onClick={leaveBattle}>GO TO LOBBY</button>
                            </div>
                        }


                        <PlayerInBattleComp player={player2}/>
                    </div>
                        :
                        <div className="page">
                        {/*<div className="arena flex-column align-items-center h-80">*/}
                           <h3>
                               Your opponent left the battle.
                           </h3>
                            <button onClick={leaveAfterBeingAbandoned} className="hitBtn" >GO BACK TO LOBBY</button>
                        </div>}

                </div>
                :
                <div className="page">
                    <h1 className="p-2">YOU ARE ALONE IN THE BATTLE</h1>
                    <button onClick={() => nav('/lobby')}>GO BACK TO LOBBY</button>
                </div>
            }
        </>

    );
};

export default GamePage;