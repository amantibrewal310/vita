
import React, {useState, useEffect} from 'react'
import axiosInstance from '../../axios'
import GetWatchList from './GetWatchList'

function GetAllWatchList({userId}) {

    const [watchlists, setWatchlists] = useState([])

    useEffect(() => {
        axiosInstance
            .get(`video/get-watchlist/user/`)
            .then(res => {
                setWatchlists(res.data)
            })
    })  

    return (
        <div>
        {   
            watchlists.map(item => <GetWatchList key={item.id} id={item.id} name={item.name} videoIds={item.videos}/>)
        }
        </div>
    )
}

export default GetAllWatchList
