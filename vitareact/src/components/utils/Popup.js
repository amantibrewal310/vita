import React from 'react';
import tick from '../../images/tick.png'

const modalContainer = {
    height: '100%',
    width: '100%',
    zIndex: '1',
    display: 'block',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center'  
}

const modal = {
    position: 'fixed',
    zIndex: '1',    
    left: '40',
    top: '6%',
    width: '400px',
    height: '100px',
    background: 'linear-gradient(to right, #fa761d, #ff1e74)',
    color: 'white',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: '5px',
    fontSize: '20px',
    flexDirection: 'row',
    marginBottom: '0',
    boxShadow: '0 8px 6px -6px black'
}

const modalText = {
    width: '60%',
    textAlign: 'center'
}

function Popup({show, message, type}) {
    return show ? (
        <div style={modalContainer}>
            <div style={modal}>
                    <div><img src={tick} style={{width: '35px'}}/></div>
                    <div style={modalText}>{message}</div>
            </div>
        </div>
    ): (<></>)
}

export default Popup
