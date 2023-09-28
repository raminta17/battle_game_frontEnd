import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePlayer} from "../features/player";
import ItemModal from "./ItemModal";

const InventoryItem = ({item}) => {

    const dispatch = useDispatch();
    const equippedWeapon = useSelector(state => state.player.player.equippedWeapon);
    const equippedArmour = useSelector(state => state.player.player.equippedArmour);
    const equippedPotion = useSelector(state => state.player.player.equippedPotion);

    async function equip() {
        const options = {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                authorization: localStorage.getItem('TOKEN')
            },
            body: JSON.stringify(item)
        }
        const res = await fetch('http://localhost:8000/equipItem',options);
        const data = await res.json();
        dispatch(updatePlayer(data.data))

    }

    return (
        <div  className="inventoryItem">
            <ItemModal item={item} remove={true}/>
            <div onClick={equip} className="inventoryImg" style={{backgroundColor: item.color ? item.color :'grey'}}>
                <img src={item.image} alt=""/>
            </div>
            {((equippedPotion && item.id === equippedPotion.id) || (equippedWeapon && item.id === equippedWeapon.id) || ( equippedArmour && item.id === equippedArmour.id)) && <b className="text-light">EQUIPPED</b>}

        </div>
    );
};

export default InventoryItem;