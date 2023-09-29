import React from 'react';
import ItemModal from "./ItemModal";
import {updatePlayer} from "../features/player";
import {useDispatch} from "react-redux";

const RandomItem = ({item}) => {

    const dispatch = useDispatch();

    async function takeItem() {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('TOKEN')
            },
            body: JSON.stringify(item)
        }
        const res = await fetch('http://localhost:8000/takeItem', options);
        const data = await res.json();
        dispatch(updatePlayer(data.data));
    }

    return (
        <div key={item.id} className="item">
            <ItemModal item={item}/>
            <img src={item.image} alt=""/>
            <button className="takeBtn" onClick={takeItem}>TAKE</button>
        </div>
    );
};

export default RandomItem;