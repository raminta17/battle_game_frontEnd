import React, {useEffect, useState} from 'react';
import {socket} from "../App";

const SinglePlayer = ({player}) => {

const [playerWhoWantsToPlay, setPayerWhoWantsToPlay] = useState();
const [isInvitationSent, setInvitationSent] = useState(false);

    useEffect(() => {
        socket.on('receiveRequest', msg => {
            console.log(msg)
            setPayerWhoWantsToPlay(msg.playerThatSentAnInvite);
        })
        socket.on('denied', result => {
            console.log(result);
            setInvitationSent(result);
        })
    }, []);

    function sendInvite() {
        socket.emit('sendInvitation', player.socketId);
        setInvitationSent(true);
    }
    function denyInvitation() {
        setPayerWhoWantsToPlay();
        socket.emit('invitationDenied', playerWhoWantsToPlay)
    }
    return (
        <div className="singlePlayerCard">
            <div className="singlePlayerImg">
                <img src={player.monster} alt=""/>
            </div>

            {playerWhoWantsToPlay && (player.username === playerWhoWantsToPlay.username) ?
                <div>
                    <b className="text-light">{playerWhoWantsToPlay.username} wants to play with you</b>
                    <div className="d-flex">
                        <button className="takeBtn">Accept</button>
                        <button onClick={denyInvitation} className="takeBtn">Deny</button>
                    </div>
                </div>
            :
                <div className="d-flex flex-column align-items-start gap-2">
                    <b className="text-light">{player.username}</b>
                    {isInvitationSent ? <b>INVITATION SENT</b> :
                    <button onClick={sendInvite} className="takeBtn">INVITE TO BATTLE</button>}
                </div>
            }
        </div>
    );
};

export default SinglePlayer;