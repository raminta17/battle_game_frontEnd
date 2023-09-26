import React from 'react';
import NavBar from "../components/NavBar";
import WeaponsCont from "../components/WeaponsCont";
import InventoryCont from "../components/InventoryCont";
import PlayersOnline from "../components/PlayersOnline";

const LobbyPage = () => {
    return (
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
    );
};

export default LobbyPage;