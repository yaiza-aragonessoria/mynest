import React, {useEffect, useState} from "react";
import axios from "axios";
import Sticker from "../../components/Sticker/Sticker";
const Home = () => {
    const token = localStorage.getItem("access");

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const [homeName, setHomeName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [homeUsers, setHomeUsers] = useState([]);
    const [homeStickers, setHomeStickers] = useState([]);
    const [newStickerContent, setNewStickerContent] = useState("")

    const toggleSticker = id => {
        let newStickers = homeStickers.map(s => s.id == id ? {...s, pinned: !s.pinned} : s);
        setHomeStickers(newStickers);
    }
    const deleteSticker = id => {
        setHomeStickers(homeStickers.filter(s => s.id != id));
    }

    const compareStickers = (a, b) => {
        if (a.pinned && b.pinned) {
            return b.id - a.id;
        } else if (a.pinned) {
            return -1;
        } else if (b.pinned) {
            return 1;
        } else {
            return b.id - a.id;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetchdata");
            let backendData = await axios.get(
                "https://mynest.propulsion-learn.ch/backend/api/home/", config
            );
            // console.log(backendData);
            setHomeName(backendData.data.name);
            setHomeAddress(backendData.data.address)
            backendData = await axios.get(
                "https://mynest.propulsion-learn.ch/backend/api/users/home/", config
            );
            // console.log(backendData);
            setHomeUsers(backendData.data);
            backendData = await axios.get(
                "https://mynest.propulsion-learn.ch/backend/api/stickers/home/", config
            );
            // console.log(backendData);
            setHomeStickers(backendData.data)
        };
        fetchData();
    }, []);

    const handleNewStickerContentChange = (e) => {
        setNewStickerContent(e.target.value);
    };

    const handleCreateNewSticker = (e) => {
        e.preventDefault();

        console.log("handlecretenewsticker");

        axios
          .post(
            "https://mynest.propulsion-learn.ch/backend/api/stickers/home/", {
                content: newStickerContent,
              }, config
          )
          .then((result) => {
              console.log(result);
              setNewStickerContent("");
              // add to the stickers list
          })
          .catch((error) => {
              // set warning
              console.log(error);
          });
    };

    return (
        <div>
            <div>{homeName}</div>
            <div>{homeAddress}</div>
            <ul>
                {homeUsers.map(u => <li key={u.id}>
                    {u.first_name}
                    <img src={u.avatar}/>
                </li>)}
            </ul>
            <form>
                <input style={{width: "80%", margin: "20px"}} type="text" placeholder="new sticker..." value={newStickerContent} onChange={handleNewStickerContentChange} />
                <button type="submit" onClick={handleCreateNewSticker}>Add Sticker</button>
            </form>
            <div>
                {homeStickers.sort(compareStickers).map(s => <Sticker key={s.id} sticker={s} toggleSticker={toggleSticker} deleteSticker={deleteSticker} />)}
            </div>
        </div>
    );
};


export default Home;