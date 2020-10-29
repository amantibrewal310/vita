
// Component Returns a watchlist

import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axiosInstance from '../../axios'
import '../css/gridResults.css'

function GetWatchList({id, name, videoIds}) {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([])

    useEffect(() => {
        getVideosInPlayList(videoIds)
    }, [])

    const getVideosInPlayList = async (arr) => {
        const promises = arr.map(async (videoId) => {
            return await axiosInstance.get(`video/video-list/${videoId}/`)
        });
        
        const responses = await Promise.all(promises)
        const allvideos = responses.map(element => element.data)
        setVideos(allvideos)
        setLoading(false)
    }

    // TODO:
    // 1. return a horizontal scroll-list
    // 2. remove from playlist
    return (
        <div>
        {   
            (loading)
            ? (<>loading</>)
            : (
                <>
                <h3>{name}</h3>
                <div className="resultContainer">
                {   
                    videos.map(item => (
                        <Link key={item.id} to={`../../preplay/${item.id}`}>
                            <div className="resultItem">
                                <img src={item.thumbnail} alt="img" className="resultThumbnail" />
                                <div className="overlay overlayBottom">
                                    <div className="resultInfo">
                                        <p className="resultTitle">
                                            {
                                                (item.title.length > 32)
                                                ? (`${item.title.substr(0, 30)}...`)
                                                : (item.title)
                                            }
                                        </p>
                                        <p className="resultDescription">
                                            {
                                                (item.description.length > 95)
                                                ? (`${item.description.substr(0, 95)}...`)
                                                : (item.description)
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
                </div>
                </>
            )
        }
        </div>
    )
}

export default GetWatchList
