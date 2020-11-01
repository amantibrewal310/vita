import React from 'react';
import tick from '../../images/tick.png';
import style from '../css/popup.module.css';
import cross from '../../images/cross.png';

function Popup({show, message, type}) {
    return show ? (
        <div className={style.modalContainer}>
            <div className={style.modal}>
                    {
                        (type === "success")
                        ? (
                            <div><img src={tick} style={{width: '35px'}} alt="tick"/></div>
                        ): (
                            <div><img src={cross} style={{width: '35px'}} alt="tick"/></div>
                        )
                    }
                    <div className={style.modalText}>{message}</div>
            </div>
        </div>
    ): (<></>)
}

export default Popup
