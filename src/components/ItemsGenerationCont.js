import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {updatePlayer} from "../features/player";
import RandomItem from "./RandomItem";

const ItemsGenerationCont = () => {

    const loggedPlayerMoney = useSelector(state => state.player.player.money);
    const randomItems = useSelector(state => state.player.player.generatedItems);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    async function generateItems() {
        if (loggedPlayerMoney < 100) {
            return setError('You don\'t have enough money');
        } else {
            setError();
        }
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('TOKEN')
            }
        }
        const res = await fetch('http://localhost:8000/generateItems', options);
        const data = await res.json();
        console.log(data);
        dispatch(updatePlayer(data.data))
    }

    return (
        <div className="weapons">
            <h4>GET NEW EQUIPMENT</h4>
            <div className="d-flex justify-content-around  align-items-center w-100 h-75">
                {randomItems && randomItems.map(item =>
                    <RandomItem key={item.id} item={item}/>
                )}
            </div>
            <div>{error}</div>
            <button className="generateBtn" onClick={generateItems}>SHUFFLE NEW ITEMS FOR $100</button>
            <div>Your money: <span className="moneySpan">${loggedPlayerMoney}</span></div>
        </div>
    );
};

export default ItemsGenerationCont;