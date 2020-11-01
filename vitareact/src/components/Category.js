import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Preloader from './utils/Preloader';
import { Link } from 'react-router-dom';
import './css/categoryItem.css';
import './css/gridResults.css';
import { API } from '../Backend';
import { getCategoriesList } from '../request';
import Header from './Header';

function Category() {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);

	// get all categories
	useEffect(() => {
		getCategoriesList()
			.then((res) => setCategories(res))
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Header />
			<div style={{ height: '60px' }}></div>
			<div>
				<div className='resultContainer'>
					<h3>Categories</h3>
				</div>
				<div className='resultContainer'>
					{categories.map((item) => (
						<Link key={item.id} to={`/category/results/${item.id}`}>
							<div className='category'>
								<img
									className='categoryImage'
									src={item.image}
									alt='cat-img'
								/>
								<div className='categoryName'>
									{item.category.charAt(0).toUpperCase() +
										item.category.slice(1)}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}

export default Category;
