import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';
import style from './css/category.module.css';
import {Link} from 'react-router-dom'

function Category() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`video/categories/`)
            .then(res => {
                setLoading(false);
                storeInRows(res.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const storeInRows = (arr) => {
        const rows = 6;
        const eachSize = Math.round(arr.length / rows);
        const rowWise = [];

        var i, j;
        var items = [];
        for(i = 0; i<rows; i++) {            
            for(j=eachSize*i; j<eachSize*(i+1); j++) {
                items.push(arr[j]);
            }
            rowWise.push(items);
            items = [];
        }   
        for(j=rows*eachSize; j<arr.length; j++) {
            rowWise[rows-1].push(arr[j]);
        }

        setCategories(rowWise);
    }

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
                                                <div className={style.categoryName}>{item.category}</div>
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
