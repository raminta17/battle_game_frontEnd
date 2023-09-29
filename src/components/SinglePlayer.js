import React, {useEffect, useState} from 'react';
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {updateInvitedPlayer, updateIsInvitationSent, updatePlayerWhoWantsToPlay} from "../features/player";

const SinglePlayer = ({player}) => {


const isInvitationSent = useSelector(state=>state.player.isInvitationSent);
const playerWhoWantsToPlay = useSelector(state => state.player.playerWhoWantsToPlay);
const invitedPlayer = useSelector(state=>state.player.invitedPlayer);
const dispatch = useDispatch();


    function sendInvite() {
        dispatch(updateIsInvitationSent(true));
        dispatch(updateInvitedPlayer(player));
        socket.emit('sendInvitation', player.socketId);
    }
    function denyInvitation() {
        dispatch(updatePlayerWhoWantsToPlay(null));
        socket.emit('invitationDenied', playerWhoWantsToPlay)
    }
    function acceptInvitation() {
        socket.emit('invitationAccepted', playerWhoWantsToPlay);
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
                        <button onClick={acceptInvitation} className="takeBtn">Accept</button>
                        <button onClick={denyInvitation} className="takeBtn">Deny</button>
                    </div>
                </div>
            :
                <div className="d-flex flex-column align-items-start gap-2">
                    <b className="text-light">{player.username}</b>
                    {isInvitationSent && player.socketId === invitedPlayer.socketId ? <b>INVITATION SENT</b> :
                    <button onClick={sendInvite} className="takeBtn">INVITE TO BATTLE</button>}
                </div>
            }
        </div>
    );
};

export default SinglePlayer;