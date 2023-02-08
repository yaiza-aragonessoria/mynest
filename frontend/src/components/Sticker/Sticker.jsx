import React, {useState} from "react";
import {ItemWrapper} from "../ShoppingList_item/ShoppingList_item.styled";
import axios from "axios";

const Sticker = ({sticker, toggleSticker, deleteSticker}) => {

    const token = localStorage.getItem("access");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const handlePinToggle = e => {
        e.preventDefault();
        const newState = !sticker.pinned;
        axios.patch(
            `https://mynest.propulsion-learn.ch/backend/api/stickers/${sticker.id}/`,
            {pinned: newState}, config)
            .then((result) => {
                toggleSticker(sticker.id);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const calculateTime = (stickerCreation) => {
        const now = new Date();
        let delta = now.getTime() - new Date(stickerCreation); // milliseconds difference

        let one_minute = 1000 * 60;
        let one_hour = one_minute * 60;
        let one_day = one_hour * 24;
        let one_month = one_day * 30;

        let minutes = Math.floor(delta / one_minute) % 60
        let hours = Math.floor(delta / one_hour) % 24
        let days = Math.floor(delta / one_day) % 30
        let months = Math.floor(delta / one_month)

        let s = ""
        if (months > 0) {
            s += months + " months "
        }
        if (days > 0) {
            s += days + " days "
        }
        if (hours > 0) {
            s += hours + " hours "
        }
        if (minutes > 0) {
            s += minutes + " minutes "
        }
        s += "ago"

        if (delta < 1000 * 60) {
            s = "just now"
        }
        return s;
    };

    const handleDelete = e => {
        e.preventDefault();
        axios.delete(
            `https://mynest.propulsion-learn.ch/backend/api/stickers/${sticker.id}/`, config)
            .then((result) => {
                deleteSticker(sticker.id);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div style={{width: "80%", margin: "20px"}}>
            <div>
                {sticker.content}
                <img src={sticker.author.avatar}/>
                {calculateTime(sticker.created)}
            </div>
            <button onClick={handlePinToggle}>{sticker.pinned ? "unpin" : "pin"}</button>
            <button onClick={handleDelete}>X</button>
        </div>
    );
};

export default Sticker;
