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
    removeInvitedPlayers,
    updateRoom,
    updateOnlinePlayer
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
            console.log(data);
            const list = data.filter(dataPlayer => dataPlayer.socketId !== socket.id);
            const onlinePlayer = data.find(dataPlayer => dataPlayer.socketId === socket.id);
            dispatch(updateOnlinePlayer(onlinePlayer));
            dispatch(updatePlayersOnline(list));
        });
        socket.on('receiveRequest', playersThatSentAnInvite => {
            console.log('playerThatSentAnInvite', playersThatSentAnInvite)
            dispatch(updatePlayersWhoWantsToPlay(playersThatSentAnInvite));
        });
        socket.on('denied', playerWhoDeniedInvitation => {
            dispatch(removeInvitedPlayers(playerWhoDeniedInvitation));
        })
        // socket.on('invitationSentSuccessfully', invitedPlayer => {
        //     dispatch(invitedPlayer(invitedPlayer));
        // })
        socket.on('yourInvitationWasAccepted', playerWhoAcceptedInvite => {
            dispatch(removeInvitedPlayers(playerWhoAcceptedInvite));
        })
        socket.on('timer', room => {
            dispatch(updateRoom(room))
        })
        socket.on('joinedRoom', room => {
            console.log('room', room);
            dispatch(updateRoom(room));
            nav('/game');
        });
        socket.on('roomInfo', room => {
            console.log('room', room);
            dispatch(updateRoom(room));
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
