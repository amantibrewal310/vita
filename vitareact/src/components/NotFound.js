import React from 'react'
import notfound from '../images/notfound.png'

function NotFound() {
    return (
        <div>
            <img src={notfound} alt='not found' style={{backgroundSize: "100%"}}/>
        </div>
    )
}

export default NotFound
