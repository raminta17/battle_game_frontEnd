import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import ItemModal from "./ItemModal";
import {updatePlayer} from "../features/player";

const ItemsGenerationCont = () => {

    const loggedPlayerMoney = useSelector(state=>state.player.player.money);
    const [randomWeapon, setRandomWeapon] = useState();
    const [randomArmour, setRandomArmour] = useState();
    const [randomPotion, setRandomPotion] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();

    async function generateItems(){
        if(loggedPlayerMoney < 100) {
            return setError('You don\'t have enough money' );
        } else {
            setError();
        }
        const options = {
            method: 'GET',
            headers: {
                'content-type':'application/json',
                authorization: localStorage.getItem('TOKEN')
            }
        }
        const res = await fetch('http://localhost:8000/generateItems',options);
        const data = await res.json();
        dispatch(updatePlayer(data.data.playerToFrontEnd))
        setRandomWeapon(data.data.randomWeapon);
        setRandomArmour(data.data.randomArmour);
        setRandomPotion(data.data.randomPotion);
    }

    async function takeItem(item) {
        const options = {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                authorization: localStorage.getItem('TOKEN')
            },
            body: JSON.stringify(item)
        }
        const res = await fetch('http://localhost:8000/takeItem', options);
        const data = await res.json();
        dispatch(updatePlayer(data.data));
        if(item.name === 'Weapon') setRandomWeapon();
        if(item.name === 'Armour') setRandomArmour();
        if(item.name === 'Potion') setRandomPotion();
    }

    return (
        <div className="weapons">
            <h4>GET NEW EQUIPMENT</h4>
           <div className="d-flex justify-content-around  align-items-center w-100 h-75">
               {randomWeapon &&
                   <div className="item">
                       <ItemModal item={randomWeapon}/>
                       <img src={randomWeapon.image} alt=""/>

                       <button className="takeBtn" onClick={() => takeItem(randomWeapon)}>TAKE</button>
                   </div>}
               {randomArmour &&
                   <div className="item">
                       <ItemModal item={randomArmour}/>
                       <img src={randomArmour.image} alt=""/>
                       <button className="takeBtn" onClick={() => takeItem(randomArmour)}>TAKE</button>
                   </div>}
               {randomPotion &&
                   <div className="item">
                       <ItemModal item={randomPotion}/>
                       <img src={randomPotion.image} alt=""/>
                       <button className="takeBtn" onClick={() => takeItem(randomPotion)}>TAKE</button>
                   </div>
               }

           </div>
            <div>{error}</div>
            <button className="generateBtn" onClick={generateItems}>SHUFFLE NEW ITEMS FOR $100</button>
            <div>Your money: <span className="moneySpan">${loggedPlayerMoney}</span></div>
        </div>
    );
};

export default ItemsGenerationCont;