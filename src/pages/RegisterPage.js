import React from 'react';
import Form from "../components/Form";
import {useEffect, useState} from "react";
import SingleMonster from "../components/SingleMonster";

const RegisterPage = () => {

    const [monsters, setMonsters] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/start')
            .then(res=>res.json()).then(data => {
                setMonsters(data.data)
        })
    },[])

    return (
        <>
            {monsters.length>0 ?
                <div className="page">
                    <h1>WELCOME TO BATTLE GAME</h1>
                    <h4>Select your monster</h4>
                    <div className="monstersCont">
                        {monsters.map((monster,index) =>
                            <SingleMonster
                                key={index}
                                index={index}
                                monster={monster}
                                selected={selected}
                                setSelected={setSelected}
                            />)}
                    </div>
                    <Form page={'Register'} selectedMonsterIndex={selected}/>
                </div>
                :
                <div className="page">
                    <h1>WELCOME TO BATTLE GAME</h1>
                    <h4>I am sorry pal, all fighters are taken. Try again later.</h4>
                </div>
            }
        </>
    );
};

export default RegisterPage;