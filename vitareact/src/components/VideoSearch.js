import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import './css/gridResults.css'
import fromStyles from './css/forms.module.css'
import Preloader from './utils/Preloader'
import Header from './Header';

function VideoSearch() {

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false)

    let timer = null;
    let userPauseTime = 700

    useEffect(() => {
        timer = setTimeout(makeSearchRequest, userPauseTime)
        return () => {
            setLoading(true)
            clearTimeout(timer)
        }
    }, [query])

    const makeSearchRequest = () => {
        if(query === '') {
            setLoading(false)
            setSearchResults([])
        } else {
            // make search  
            const queryStr = query.split(' ').join('+');
            console.log(queryStr);

            axios.get(`http://127.0.0.1:8000/api/video/video-search/?search=${queryStr}`)
                .then(res => {
                    setSearchResults(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <>
        <Header />
        <div>
            <div>
                <div className="resultContainer" style={{flexDirection:'column'}}>
                    <h3>Lets find it for you!</h3>  
                    <input
                        type="text"
                        placeholder="Type in movies.."
                        onChange={(e) => {setQuery(e.target.value)}}
                        className={fromStyles.input}
                    />
                </div>
                
                {
                    (loading)
                    ? (
                        <div style={{width: '100vw', height: '20vh'}}>
                            <Preloader />
                        </div>
                    )
                    : ( 
                        (query.length > 0)
                            ? 
                            (searchResults.length == 0)
                            ? (<div className="resultContainer">No Results</div>)
                            : (
                                <div className="resultContainer">
                                {
                                    searchResults.map(item => (
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
                            )
                            : (
                                <></>
                            )
                    )
                }
                
            </div> 
        </div>
        </>
    )
}

export default VideoSearch
