import React from 'react';
import ItemModal from "./ItemModal";
import {useSelector} from "react-redux";
import {socket} from "../App";

const PlayerInBattleComp = ({player}) => {

    const room = useSelector(state=>state.player.room);
    const loggedInPlayer = useSelector(state=>state.player.player);

    function usePotion(){
        if(loggedInPlayer.username === player.username) socket.emit('usePotion', {roomId: room.roomId, username: loggedInPlayer.username})
    }

    return (
        <div className="playerCont">
            <h3>{player.username}</h3>
            <div className="arenaImg"><img src={player.monster} alt=""/></div>
            <div className="healthBarCont">
                <div className="healthBar" style={{width: player.hp + '%'}}>
                    <b className="healthPoints">{player.hp} HP</b>
                </div>
            </div>
            <div className="moneyDiv text-light">{loggedInPlayer.username === player.username && `Money: ${player.winPot}$`}</div>
            <div className="equipped justify-content-around">
                <div className="inventoryImg">
                    {player.equippedWeapon ?
                        <div>
                            <ItemModal item={player.equippedWeapon}/>
                            <img src={player.equippedWeapon.image}/>
                        </div>

                        :
                        'no equipped weapon'}
                </div>
                <div className="inventoryImg">
                    {player.equippedArmour ?
                        <div>
                            <ItemModal item={player.equippedArmour}/>
                            <img src={player.equippedArmour.image}/>
                        </div>
                        : 'no equipped armour'}</div>
                <div className="inventoryImg">
                    {player.equippedPotion ?
                        <div onClick={usePotion}>
                            <ItemModal item={player.equippedPotion}/>
                            <img src={player.equippedPotion.image}/>
                        </div>
                        : 'no equipped potion'}</div>
            </div>
        </div>
    );
};

export default PlayerInBattleComp;