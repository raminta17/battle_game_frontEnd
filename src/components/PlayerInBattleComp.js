import React from 'react';
import ItemModal from "./ItemModal";

const PlayerInBattleComp = ({player}) => {


    return (
        <div className="playerCont">
            <h3>{player.username}</h3>
            <div className="arenaImg"><img src={player.monster} alt=""/></div>
            <div className="healthBarCont">
                <div className="healthBar" style={{width: player.hp + '%'}}>{player.hp} HP</div>
            </div>
            <div className="text-light">Money: {player.money}$</div>
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
                        <div>
                            <ItemModal item={player.equippedPotion}/>
                            <img src={player.equippedPotion.image}/>
                        </div>
                        : 'no equipped potion'}</div>
            </div>
        </div>
    );
};

export default PlayerInBattleComp;