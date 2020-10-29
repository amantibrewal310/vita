import React, {useState, useEffect} from 'react'
import axiosInstance from '../../axios'
import CreateWatchlist from './CreateWatchlist'
import formStyle from '../css/forms.module.css'

function AddToWatchlist({setAddTo, setShowPopup, videoId}) {

    const [watchlists, setWatchlists] = useState([])
    const [selected, setSelected] = useState(-1)
    const [showCreateNewOption, setShowCreateNewOption] = useState(false)

    // get user's watchlists
    useEffect(() => {
        console.log('use effect')
        getWatchlistOptions()
    }, [])  

    const getWatchlistOptions = () => {
        console.log('getting wathlist options')
        axiosInstance
            .get(`video/get-watchlist/user/`)
            .then(res => {
                setWatchlists(res.data)
            })
    }

    const handleAddThisVideo = () => {

        if(selected == -1) {
            return
        }
        
        saveVideoToWatchlist()

        // TODO:
        // show pop up
        // show errors 
        // no option selected, if -1 selected 
        
        // uncomment
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1500)
        setAddTo(false)
    }

    const saveVideoToWatchlist = async () => {
        // get all the videos that are already in the watchlist
        let res = await axiosInstance.get(`video/watchlist/${selected}/`)
        let videosInWatchlist = res.data.videos
        videosInWatchlist = [...videosInWatchlist, parseInt(videoId)]
        
        // we send pacth with updated video array 
        const body = {videos: videosInWatchlist}
        res = await axiosInstance.patch(`video/watchlist/${selected}/`, body)
    }

    return (
        <div>
            <div className={formStyle.videoSelectInputContainer}>
                <select 
                    value={selected} 
                    onChange={(e) => setSelected(e.target.value)}
                    className={formStyle.input}
                    style={{color: 'white'}}
                >

                    <option 
                        key='0'
                        value='-1'
                    > 
                        Select
                    </option>

                    {
                        watchlists.map(option => (
                            <option 
                                key={option.id} 
                                value={option.id}
                            > 
                                {option.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button 
                onClick={handleAddThisVideo} 
                className={formStyle.videoSubmitBtn}
            >Add</button>
            <button 
                onClick={() => setShowCreateNewOption(!showCreateNewOption)} 
                className={formStyle.videoSubmitBtn}
            >Create New Watchlist</button>
            {
                (showCreateNewOption)
                ? (<CreateWatchlist setShowCreateNewOption={setShowCreateNewOption} refreshOptions={getWatchlistOptions}/>)
                : (<></>)
            }
        </div>
    )
}

export default AddToWatchlist
