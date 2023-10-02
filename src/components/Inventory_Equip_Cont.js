import React from 'react';
import {useSelector} from "react-redux";
import InventoryItem from "./InventoryItem";
import ItemModal from "./ItemModal";

const Inventory_Equip_Cont = () => {

    const inventory = useSelector(state => state.player.player.inventory);
    const equippedWeapon = useSelector(state => state.player.player.equippedWeapon);
    const equippedArmour = useSelector(state => state.player.player.equippedArmour);
    const equippedPotion = useSelector(state => state.player.player.equippedPotion);


    return (
        <div className="inventoryCont">
            <div className="w-100">
                <h4>INVENTORY</h4>
                <div className="inventory">
                    {inventory.map((item, index) =>
                        <InventoryItem item={item} key={index}/>
                    )}
                </div>
            </div>
            <div>
                <h5 className="equipText">PREPARE FOR BATTLE</h5>
                <div className="equipped">
                    <div className="inventoryImg">
                        {equippedWeapon ?
                            <div>
                                <ItemModal item={equippedWeapon}/>
                                <img src={equippedWeapon.image}/>
                            </div>

                            :
                            'click on weapon to equip'}
                    </div>
                    <div className="inventoryImg">
                        {equippedArmour ?
                            <div>
                                <ItemModal item={equippedArmour}/>
                                <img src={equippedArmour.image}/>
                            </div>
                            : 'click on armour to equip'}</div>
                    <div className="inventoryImg">
                        {equippedPotion ?
                            <div>
                                <ItemModal item={equippedPotion}/>
                                <img src={equippedPotion.image}/>
                            </div>
                            : 'click on potion to equip'}</div>
                </div>
            </div>
        </div>
    );
};

export default Inventory_Equip_Cont;