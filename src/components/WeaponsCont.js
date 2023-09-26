import React from 'react';
import {useSelector} from "react-redux";

const WeaponsCont = () => {

    const loggedPlayerMoney = useSelector(state=>state.player.player.money);

    async function generateItems(){
        const res = await fetch('http://localhost:8000/generateItems');
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="weapons">
           <div className="d-flex justify-content-around  align-items-center w-100 h-75">
                <div className="item">

                        <img src="https://static.vecteezy.com/system/resources/previews/026/795/438/original/cartoon-game-sword-on-transparent-background-crossed-knight-sword-ancient-weapon-cartoon-design-free-png.png" alt=""/>

                    <button className="takeBtn">TAKE</button>
                </div>
                <div className="item">
                    <div>armour</div>
                    <button className="takeBtn">TAKE</button>
                </div>
                <div className="item">
                    <div>potion</div>
                    <button className="takeBtn">TAKE</button>
                </div>
           </div>
            <button className="generateBtn" onClick={generateItems}>GENERATE $100</button>
            <div>Your money: <span className="moneySpan">${loggedPlayerMoney}</span></div>
        </div>
    );
};

export default WeaponsCont;