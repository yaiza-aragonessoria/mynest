import React, {useState} from "react";
import axios from "axios";
import { StickerBox } from "./Sticker.styled";

import { Textfit } from 'react-textfit';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

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
            if (months > 1) {
                s += months + " months "
            } else {
                s += "1 month "
            }
        } else if (days > 0) {
            if (days > 1) {
                s += days + " days "
            } else {
                s += "1 day "
            }
        } else if (hours > 0) {
            if (hours > 1) {
                s += hours + " hours "
            } else {
                s += "1 hour "
            }
        } else if (minutes > 0) {
            if (minutes > 1) {
                s += minutes + " minutes "
            } else {
                s += "1 minute "
            }
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

    let size = "small";
    if (sticker.content.length > 200) {
        size = "medium";
     }
    if (sticker.content.length > 400) {
        size = "large";
    }
    if (sticker.content.length > 600) {
        size = "xlarge";
    }
    if (sticker.content.length > 800) {
        size = "xxlarge";
    }

    return (
        <StickerBox
            className={size} style={{backgroundColor: sticker.pinned ? "#ffd74f" : "white" }} >
            <div className="sticker-top">
                <div className="user_name_icon">
                <img src={"https://mynest.propulsion-learn.ch" + sticker.author.avatar} />
                <span className="subheader">{sticker.author.first_name}</span></div>

                <button className="btn_purple" id="pin_btn" onClick={handlePinToggle}>{sticker.pinned ? <AiFillPushpin/> : <AiOutlinePushpin/>}</button>
            </div>

            <div className="content text">
                {/* <Textfit style={{height: '100%'}} mode="multi"> */}
                    {sticker.content}
                    {/* </Textfit> */}
            </div>

             <div className="sticker-bottom">
                 <span className="text">{calculateTime(sticker.created)}</span>
                 <button className="btn_grey" id="delete_sticker_btn" onClick={handleDelete}><MdDeleteForever/></button>
             </div>
        </StickerBox>
    );
};

export default Sticker;
