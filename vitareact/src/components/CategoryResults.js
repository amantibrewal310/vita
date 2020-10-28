import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios';
import StoreInRows from './utils/StoreInRows';
import style from './css/category.module.css';
import './css/categoryResults.css'

function CategoryResults() {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const rows = 6;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/videos/?category=${id}`)
            .then(res => {
                const rowWise = StoreInRows(rows, res.data);
                setVideos(rowWise);
                setLoading(false);
            });
    }, []);

    // category name
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video/categories/${id}/`)
            .then(res => {
                let category = res.data.category; 
                category = category.charAt(0).toUpperCase() + category.slice(1);
                setCategoryName(category);
            });
    });

    
    
    return (
        <div className={style.categoryContainer}>
            <h3 className={style.categoryContainerHeading}>Popular in {categoryName}</h3>
            {
                (loading)
                ? (<p style={{color: 'white'}}>Loading</p>)
                : ( 
                    <div className={style.categoryRow}>
                    {
                        videos.map((row, index) => {
                            return (
                                <div key={index} className={style.categoryColumn}>
                                {
                                    row.map(item => (
                                        <Link key={item.id} to={`../../preplay/${item.id}`}>
                                            
                                            <div className="resultItem">
                                                <img src={`http://127.0.0.1:8000${item.thumbnail}`} alt="img" className="resultThumbnail" />
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
                        })
                    }
                    </div>
                )
            }
        </div> 
    )
}

export default CategoryResults
