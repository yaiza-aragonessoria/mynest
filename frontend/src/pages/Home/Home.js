import React, {useEffect, useState} from "react";
import axios from "axios";
const Home = () => {
    const token = localStorage.getItem("access");

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const [, setTobuyItem] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const backendData = await axios.get(
                "https://mynest.propulsion-learn.ch/backend/api/home/", config
            );
            console.log(backendData);
        };
        fetchData();
    }, []);

    return (
        <div>
            Home
        </div>
    );
};


export default Home;