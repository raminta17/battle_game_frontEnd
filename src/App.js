import './App.css';
import {io} from 'socket.io-client';
import {Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import RegisterPage from "./pages/RegisterPage";
import {useEffect} from "react";

export const socket = io('http://localhost:8000', {
    autoConnect: false
});



function App() {


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
