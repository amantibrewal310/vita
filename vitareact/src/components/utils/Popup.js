import React from 'react';
import tick from '../../images/tick.png';
import style from '../css/popup.module.css';


function Popup({show, message, type}) {
    return show ? (
        <div className={style.modalContainer}>
            <div className={style.modal}>
                    <div><img src={tick} style={{width: '35px'}} alt="tick"/></div>
                    <div className={style.modalText}>{message}</div>
            </div>
        </div>
    ): (<></>)
}

export default Popup
