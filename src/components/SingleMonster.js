import React from 'react';

const SingleMonster = ({ monster, index,selected,setSelected }) => {

    function selectMonster() {
        setSelected(index);
    }

    return (
        <div className={`singleMonster ${selected === index ? "selectedMonster" : ""}`} onClick={selectMonster}>
            <img src={monster} alt="" />
        </div>
    );
};

export default SingleMonster;
