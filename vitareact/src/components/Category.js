import React, {useState, useEffect} from 'react';
import axios from 'axios';
import style from './css/category.module.css';
import {Link} from 'react-router-dom'
import StoreInRows from './utils/StoreInRows';

function Category() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const rows = 6;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video/categories/`)
            .then(res => {
                const rowWise = StoreInRows(rows, res.data);
                setCategories(rowWise);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    return (
        <div className={style.categoryContainer}>
            <h3 className={style.categoryContainerHeading}>Categories</h3>
            {
                (loading)
                ? (<p style={{color: 'white'}}>Loading</p>)
                : (
                    <div className={style.categoryRow}>
                    {
                        categories.map((row, index) => {
                            return (
                                <div key={index} className={style.categoryColumn}>
                                {
                                    row.map(item => (
                                        <Link key={item.id} to={`/category/results/${item.id}`}>
                                            <div className={style.category}>
                                                <img className={style.categoryImage} src={item.image} alt="cat-img" />
                                                <div className={style.categoryName}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
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

export default Category
