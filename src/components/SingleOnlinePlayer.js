import React from 'react';
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {
    updateError,
    addInvitedPlayers,
    removePlayersWhoWantsToPlay
} from "../features/player";

const SingleOnlinePlayer = ({player}) => {

    const onlinePlayer = useSelector(state=>state.player.onlinePlayer);
    console.log('onlinePlayer', onlinePlayer);
    const playersWhoWantsToPlay = useSelector(state => state.player.onlinePlayer.receivedInvitations);
    const invitedPlayers = useSelector(state => state.player.onlinePlayer.sentInvitations);
    const loggedInPlayer = useSelector(state => state.player.player);
    const error = useSelector(state => state.player.error);
    const dispatch = useDispatch();
    console.log('playersWhoWantsToPlay', playersWhoWantsToPlay);
    // console.log('invitedPlayer', invitedPlayers);
    const invitedPlayer = invitedPlayers.find(invitedPlayer => invitedPlayer === player.username);
    const playerWhoWantsToPlay = playersWhoWantsToPlay.find(whoWantsToPlay => whoWantsToPlay === player.username);
    console.log('playerWhoWantsToPlay', playerWhoWantsToPlay);
    function sendInvite() {
        if (!loggedInPlayer.equippedWeapon) return dispatch(updateError({
            username: player.username,
            message: 'Equip Weapon to start a battle'
        }));
        dispatch(addInvitedPlayers(player));
        socket.emit('sendInvitation', player.socketId);
    }

    function denyInvitation() {
        // dispatch(removePlayersWhoWantsToPlay(playerWhoWantsToPlay));
        socket.emit('invitationDenied', player.socketId);
        if(player.username === error.username) dispatch(updateError());
    }

    function acceptInvitation() {
        if (!loggedInPlayer.equippedWeapon) return dispatch(updateError({
            username: player.username,
            message: 'Equip Weapon to start a battle'
        }));
        socket.emit('invitationAccepted', playersWhoWantsToPlay[0]);
        dispatch(removePlayersWhoWantsToPlay(player))
    }

    return (
        <div className="singlePlayerCard">
            <div className="singlePlayerImg">
                <img src={player.monster} alt=""/>
            </div>
            {!player.inBattle ?
                <div>
                    {playerWhoWantsToPlay && (player.username === playerWhoWantsToPlay) ?
                        <div>
                            <b className="text-light">{playerWhoWantsToPlay} wants to play with you</b>
                            <div className="d-flex">
                                <button onClick={acceptInvitation} className="takeBtn">Accept</button>
                                <button onClick={denyInvitation} className="takeBtn">Deny</button>
                            </div>
                            {error && error.username === player.username && <div className="text-danger">{error.message}</div>}
                        </div>
                        :
                        <div className="d-flex flex-column align-items-start gap-2">
                            <b className="text-light">{player.username}</b>
                            {invitedPlayer && player.username === invitedPlayer ? <b>INVITATION SENT</b> :
                                <button onClick={sendInvite} className="takeBtn">INVITE TO BATTLE</button>}
                            {error && error.username === player.username && <div className="text-danger">{error.message}</div>}
                        </div>
                    }
                </div>
                :
                <div>IN BATTLE</div>
            }

        </div>
    );
};

export default SingleOnlinePlayer;