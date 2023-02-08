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
            <div>{sticker.content} {sticker.author.first_name} {sticker.created}</div>
            <button onClick={handlePinToggle}>{sticker.pinned ? "unpin" : "pin"}</button>
            <button onClick={handleDelete}>X</button>
        </div>
    );
};

export default Sticker;
