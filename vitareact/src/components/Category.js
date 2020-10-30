import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './css/categoryItem.css'
import './css/gridResults.css'
import Preloader from './utils/Preloader';


function Category() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    // get all categories 
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video/categories/`)
            .then(res => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    return (
        (loading)
        ? (
            <div style={{width: '100vw', height: '80vh'}}>
                <Preloader />
            </div>
        ) : (
            <div>
                <div className="resultContainer">
                    <h3>Categories</h3>
                </div>
                <div className="resultContainer">
                {
                   categories.map(item => (
                       <Link key={item.id} to={`/category/results/${item.id}`}>
                           <div className="category">
                               <img className="categoryImage" src={item.image} alt="cat-img" />
                               <div className="categoryName">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
                           </div> 
                       </Link>
                   ))
                }
                </div>
            </div> 
        )
    )
}

export default Category
