import React, {useState, useEffect} from 'react'
import axios from 'axios'
import VideoList from './components/VideoList';
import Preloader from './components/utils/Preloader';

function App() {
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
        (appState.loading)
        ? (
            <div style={{width: '100vw', height: '80vh'}}>
                <Preloader />
            </div>
        ) : (
            <VideoList videoList={appState.videoList} />
        )
    )
}

export default App
