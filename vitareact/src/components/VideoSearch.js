import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import './css/gridResults.css'
import fromStyles from './css/forms.module.css'

function VideoSearch() {

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    let timer = null;
    let userPauseTime = 1000

    useEffect(() => {
        timer = setTimeout(makeSearchRequest, userPauseTime)
        return () => clearTimeout(timer)
    }, [query])

    const makeSearchRequest = () => {
        if(query === '') {
            setSearchResults([])
        } else {
            // make search  
            const queryStr = query.split(' ').join('+');
            console.log(queryStr);

            axios.get(`http://127.0.0.1:8000/api/video/video-search/?search=${queryStr}`)
                .then(res => {
                    setSearchResults(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
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
                    (searchResults.length == 0)
                    ? (<></>)
                    : ( 
                        <div className="resultContainer">
                        {searchResults.map(item => (
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
                        ))} 
                        </div>  
                    )
                }
                
            </div> 
        </div>
    )
}

export default VideoSearch
