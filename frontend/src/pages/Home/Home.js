import React, {useEffect, useState} from "react";
import axios from "axios";
const Home = () => {
    const token = localStorage.getItem("access");

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const [homeName, setHomeName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [homeUsers, setHomeUsers] = useState([]);
    const [homeStickers, setHomeStickers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let backendData = await axios.get(
                "https://mynest.propulsion-learn.ch/backend/api/home/", config
            );
            console.log(backendData);
            setHomeName(backendData.data.name);
            setHomeAddress(backendData.data.address)
            backendData = await axios.get(
                "https://mynest.propulsion-learn.ch/backend/api/users/home/", config
            );
            console.log(backendData);
            setHomeUsers(backendData.data);
            backendData = await axios.get(
                "https://mynest.propulsion-learn.ch/backend/api/stickers/home/", config
            );
            console.log(backendData);
            setHomeStickers(backendData.data)
        };
        fetchData();
    }, []);

    return (
        <div>
            <div>{homeName}</div>
            <div>{homeAddress}</div>
            <ul>
                {homeUsers.map(u => <li key={u.id}>{u.first_name} {u.last_name}</li>)}
            </ul>
            <ul>
                {homeStickers.map(s => <li key={s.id}>{s.content} {s.author.first_name}</li>)}
            </ul>
        </div>
    );
};


export default Home;