import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import axiosInstance from '../axios';

function CategoryResults() {
    const {id} = useParams();
    const [videos, setVideos] = useState([]);
    const [catName, setCatName] = useState('');

    useEffect(() => {
        axiosInstance
            .get(`videos/?category=${id}`)
            .then(res => {
                console.log(res);
                setVideos(res.data);
            });
    }, []);

    useEffect(() => {
        axiosInstance
            .get(`video/categories/${id}/`)
            .then(res => {
                let cat = res.data.category; 
                cat = cat.charAt(0).toUpperCase() + cat.slice(1);
                setCatName(cat);
            });
    })

    return (
        <ol>
            {
                videos.map(video => (
                    <Link key={video.id} to={`/play/${video.id}`}>
                        
                            <li>{video.title}</li>
                       
                    </Link>
                ))
            }
        </ol>
    )
}

export default CategoryResults
