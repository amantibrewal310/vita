import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import style from  './css/videoPreplay.module.css';
import AddToWatchlist from './Watchlist/AddToWatchlist';
import Popup from './utils/Popup';

function VideoPreplay() {
    const {id} = useParams();

    const [video, setVideo] = useState({});
    const [extras, setExtras] = useState([]);
    const [extrasLoading, setExtrasLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    const [addTo, setAddTo] = useState(false);
    const [showPopup, setShowPopup] = useState(false);  

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

        // axios.get(url)
        //     .then(res => {
        //         setExtras(res.data.items);
        //         setExtrasLoading(false);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    const getPlayTime = (timeInmins) => {
        const hrs = Math.floor(timeInmins / 60)
        const mins = timeInmins % 60
        let playtime = '';
        if(hrs > 0) {
            playtime += `${hrs} hrs`
        }
        if(mins > 0) {
            playtime += ` ${mins} mins`
        }
        return playtime
    }
    const getCategory = (categoryId) => {
        // return ("Adventure")
    }

    // handler for add to watchlist 
    const handleAddToWatchlistClick = () => {
        setAddTo(!addTo);
    }

    return (
        <div>
        <Popup show={showPopup} message="Added to Watchlist" type="success"/>
        {
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
                                    <b>{getPlayTime(video.playtime)} . 2019 . {getCategory(video.category)}</b>
                                </p>
                                <p className={style.description}>
                                    {video.description}
                                </p>
                            </div>
                            <div className={style.videoStats}>
                                <span>
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                    {video.views} 
                                </span>
                                <span>
                                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                    {video.likes} 
                                </span>
                                <span>
                                <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                    {video.dislikes} 
                                </span>
                            </div>
                            <div className={style.watchOptions}>
                                <div className={style.watchOptionsDiv}>
                                    <Link key={video.id} to={`../play/${video.id}`} >
                                        <i style={{cursor:'pointer', color:'white'}} className={`fa fa-play ${style.fa}`} aria-hidden="true"></i>
                                        <b style={{color:'white', cursor:'pointer'}}>Play Now</b>
                                    </Link>
                                </div>
                                <div className={style.watchOptionsDiv} onClick={handleAddToWatchlistClick}>
                                    {
                                        (!addTo)
                                        ? (<i style={{cursor:'pointer'}} className={`fa fa-plus ${style.fa}`} aria-hidden="true"></i>)
                                        : (<i style={{cursor:'pointer'}} className={`fa fa-times ${style.fa}`} aria-hidden="true"></i>)
                                    }
                                    <b style={{cursor:'pointer'}}>Watchlist</b>
                                </div>
                            </div>
                            <div className={style.backupWatchOptions}>
                                <div className={style.backupWatchOptionsDiv}>
                                    <Link key={video.id} to={`play/${video.id}`} >
                                        <i style={{color:'white'}} className={`fa fa-play ${style.fa}`} aria-hidden="true"></i>
                                        <b style={{color:'white'}}>Play Now</b>
                                    </Link>
                                </div>
                                <div className={style.backupWatchOptionsDiv} onClick={handleAddToWatchlistClick}>
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
                                <b>{getPlayTime(video.playtime)} . 2019 . {getCategory(video.category)}</b>
                            </p>
                            <p className={style.description}>
                                {video.description}
                            </p>
                        </div>
                        <div className={style.bottomVideoStats}>
                            <span>
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                {video.views} 
                            </span>
                            <span>
                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                {video.likes} 
                            </span>
                            <span>
                            <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                {video.dislikes} 
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* add to watchlist */}
                {
                    (addTo)
                    ? ( <div className={style.detailBanner} style={{paddingBottom: '20px'}}>
                            <h3 style={{padding:'10px'}}> Select Watchlist</h3>
                            <AddToWatchlist setAddTo={setAddTo} setShowPopup={setShowPopup} videoId={id}/>
                        </div>
                    ): 
                    (<></>)
                }

                {/* trailers/Extras from youtube */}
                {/* make a horizontal scroll bar */}
                <div className={style.detailBanner}>
                    <h3 style={{padding:'10px'}}> Trailers and Extras</h3>
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
                                                src={`http://www.youtube.com/embed/${item.id.videoId}`} title="Trailer" allowFullScreen="allowfullscreen">
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
        }
        </div>
    )
}

export default VideoPreplay
