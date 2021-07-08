
import React from 'react'
import style from './css/commentStyles.module.css'

function UserAvatar({letter}) {
    return (
        <h3 className={style.avatar}>{letter.toUpperCase()}</h3>
    )
}

export default UserAvatar
