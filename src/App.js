import './App.css';
import {io} from 'socket.io-client';
import {Routes, Route, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import RegisterPage from "./pages/RegisterPage";
import {useEffect} from "react";
import {
    updatePlayersOnline,
    updatePlayersWhoWantsToPlay,
    updateRoom, updateInvitedPlayers, updateAbandoned
} from "./features/player";
import {useDispatch} from "react-redux";

export const socket = io('http://localhost:8000', {
    autoConnect: false
});

function App() {

    const dispatch = useDispatch();
    const nav= useNavigate();

    useEffect(() => {
        socket.on('sendingAllUsers', data => {
            const onlinePlayer = data.find(dataPlayer => dataPlayer.socketId === socket.id);
            let list = data.filter(player => player.isOnline === true);
            list = list.filter(dataPlayer => dataPlayer.socketId !== socket.id);
            dispatch(updatePlayersOnline(list));
            dispatch(updatePlayersWhoWantsToPlay(onlinePlayer.receivedInvitations));
            dispatch(updateInvitedPlayers(onlinePlayer.sentInvitations));
        });
        socket.on('receiveRequest', playersThatSentAnInvite => {
            dispatch(updatePlayersWhoWantsToPlay(playersThatSentAnInvite));
        });
        socket.on('yourInvitationWasDenied', updatedSentInvitations => {
            dispatch(updateInvitedPlayers(updatedSentInvitations));
        });
        socket.on('youDeniedInvitation', updatedReceivedInvitations => {
            dispatch(updatePlayersWhoWantsToPlay(updatedReceivedInvitations));
        })
        socket.on('invitationSentSuccessfully', sentInvitations => {
            dispatch(updateInvitedPlayers(sentInvitations));
        })
        socket.on('yourInvitationWasAccepted', updatedSentInvitations => {
             dispatch(updateInvitedPlayers(updatedSentInvitations));
        })
        socket.on('you accepted the invitation', updatedReceivedInvitations => {
            dispatch(updatePlayersWhoWantsToPlay(updatedReceivedInvitations));
        })
        socket.on('timer', room => {
            dispatch(updateRoom(room))
        })
        socket.on('joinedRoom', room => {
            dispatch(updateRoom(room));
            nav('/game');
        });
        socket.on('roomInfo', room => {
            console.log('room info coming back from sockets', room)
            dispatch(updateRoom(room));
        })
        socket.on('youWereLeftAlone', res => {
            dispatch(updateAbandoned(res));
        });
        socket.on('logout', msg => {
            nav('/');
            socket.disconnect();
        })
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/lobby" element={<LobbyPage/>}/>
                <Route path="/game" element={<GamePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
