import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ContentLoading from './components/ContentLoading'
import VideoList from './components/VideoList';

function App() {

    const VideoListLoading = ContentLoading(VideoList)
    const [appState, setAppState] = useState({
        loading: true,
        videoList: null
    })

    // Don't use the axiosInstance from './axios'
    // since it sends a bearer token null with it when user is not authenticated 
    // and so videos are not fetched, and invalid_token error is genreated 
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video/video-list/`)
        .then(res => {
            setAppState({
                loading: false,
                videoList: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }, [setAppState]);

    return (
        <div>
            <h1>Latest Vidoes</h1>
            {/* TODO: 
                search box
            */}
            <VideoListLoading 
                isLoading={appState.loading} 
                videoList={appState.videoList} 
            />
        </div>
    )
}

export default App
