import React from 'react';
import {useDispatch} from "react-redux";
import {updatePlayer} from "../features/player";

const ItemModal = ({item, remove}) => {

    const dispatch = useDispatch();

    async function removeItem() {
        const options = {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                authorization: localStorage.getItem('TOKEN')
            },
            body: JSON.stringify(item)
        }
        const res = await fetch('http://localhost:8000/removeItem', options);
        const data = await res.json();
        dispatch(updatePlayer(data.data));
    }

    return (
        <div className="itemModal" style={{backgroundColor: item.color ? item.color : 'grey'}}>
            <b className="d-flex align-items-center justify-content-between">{item.name} {remove && item.id!==1 &&
                <i onClick={removeItem} className="remove fa-solid fa-trash"></i>}</b>
            {item.level &&
            <div>Level: {item.level}</div>}
            {item.damage &&
                <div>Damage: {item.damage}</div>}
            {(item.dodge || item.dodge===0) &&
                <div>Dodge: {item.dodge}</div>}
            {(item.gold || item.gold===0) &&
            <div>Gold: {item.gold}</div>}
            {item.restores &&
            <div>Restores: {item.restores} HP</div>}
            {item.effects &&
                <div>
                    {item.effects.map((effect,index) =>
                        <div key={index}>
                            <b>{effect.effect}: {effect.chance} </b>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default ItemModal;