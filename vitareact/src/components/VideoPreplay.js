import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import style from  './css/videoPreplay.module.css';

function VideoPreplay() {
    const {id} = useParams();

    const [video, setVideo] = useState({});
    const [extras, setExtras] = useState([]);
    const [extrasLoading, setExtrasLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video/video-list/${id}/`)
            .then(res => {
                setVideoLoading(false);
                setVideo(res.data);
                getExtras(res.data.title);
            })
            .catch(err => {
                console.log('error in video data: ' + err);
            });
    }, []);

    const getExtras = (title) => {
        const q = title.replace(/[^a-zA-Z ]/g, "").split(' ').join('+');
        const baseurl = `https://www.googleapis.com/youtube/v3/search`;
        const key = `AIzaSyCZy2OBsSgT6FkZbyefZbZT_-Im11dzsbs`
        const maxResults = 5
        const url = `${baseurl}?part=snippet&key=${key}&type=video&q=${q},trailer&order=viewCount&maxResults=${maxResults}`;

        axios.get(url)
            .then(res => {
                console.log(res.data.items);
                setExtras(res.data.items);
                setExtrasLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        (videoLoading) 
        ? (<div>videoLoading</div>)
        :(
            <>
            <div className={style.detailBanner}>
                <div className={style.detailInfoContainer}>
                    <div className={style.imageContainer}>
                        <div className={style.imageHolder}>
                            <img src={video.thumbnail} alt="img" />
                        </div>
                        <div className={style.imageGradient}></div>
                    </div>
                    <div className={style.detailContainer}>
                        <div className={style.titleAndDetail}>
                            <h1 className={style.videoTitle}><b>{video.title}</b></h1>
                            <p className={style.timeGenre}>
                                <b>2 hr 10 min . 2019 . Drama</b>
                            </p>
                            <p className={style.description}>
                                {video.description}
                            </p>
                        </div>
                        <div className={style.watchOptions}>
                            <div className={style.watchOptionsDiv}>
                                <i className={`fa fa-play ${style.fa}`} aria-hidden="true"></i>
                                <Link key={video.id} to={`../play/${video.id}`} >
                                    <b style={{color:'white'}}>Play Now</b>
                                </Link>
                            </div>
                            <div className={style.watchOptionsDiv}>
                                <i className={`fa fa-plus ${style.fa}`} aria-hidden="true"></i>
                                <b>Watchlist</b>
                            </div>
                        </div>
                        <div className={style.backupWatchOptions}>
                            <div className={style.backupWatchOptionsDiv}>
                                <i className={`fa fa-play ${style.fa}`} aria-hidden="true"></i>
                                <Link key={video.id} to={`play/${video.id}`} >
                                    <b style={{color:'white'}}>Play Now</b>
                                </Link>
                            </div>
                            <div className={style.backupWatchOptionsDiv}>
                                <i className={`fa fa-plus ${style.fa}`} aria-hidden="true"></i>
                                <b>Watchlist</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bottomDetailContainer}>
                    <div className={style.bottomTitleAndDetail}>
                        <h1 className={style.bottomTitle}><b>{video.title}</b></h1>
                        <p className={style.timeGenre}>
                            <b>2 hr 10 min . 2019 . Drama</b>
                        </p>
                        <p className={style.description}>
                            {video.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* trailers/Extras from youtube */}
            {/* make a horizontal scroll bar */}
            <div className={style.detailBanner}>
                <h1 style={{padding:'10px'}}> Trailers and Extras</h1>
                <div className={style.extras}>
                    {
                        (extrasLoading)
                        ? <>Loading...</>
                        : (
                            extras.map((item, index) => (
                                <div key={index} className={style.extrasItem}>
                                    <div className={style.iframe}>
                                        <iframe 
                                            width='320px' height='180px' 
                                            frameBorder='0'
                                            style={{borderRadius: '6px'}}
                                            src={`http://www.youtube.com/embed/${item.id.videoId}`} title="Trailer" allowfullscreen="allowfullscreen">
                                        </iframe>
                                        {/* <span className={style.extrasTitle}>{item.snippet.title}</span> */}
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            </>
        )
    )
}

export default VideoPreplay
