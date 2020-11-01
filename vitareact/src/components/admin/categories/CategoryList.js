import React, { useEffect, useState } from 'react';
import { getCategoriesList } from '../../../request';
import CategoryItem from './CategoryItem';
import formStyles from '../../css/forms.module.css';
import axios from 'axios';
import Header from '../../Header';
import './categoryList.css';

function CategoryList() {
	const [categories, setCategories] = useState([]);
	const [newCatName, setNewCatName] = useState('');
	const [image, setImage] = useState(null);
	const [showCreateForm, setShowCreateForm] = useState(false);

	useEffect(() => {
		refreshCategories();
	}, []);

	const refreshCategories = async () => {
		const res = await getCategoriesList();
		setCategories(res);
	};

	// handler
	const handleSubmit = (e) => {
		e.preventDefault();
		if (newCatName === '' || !image) {
			return;
		}

		let formData = new FormData();
		formData.append('category', newCatName);
		formData.append('image', image.image[0]);

		axios
			.post(`http://127.0.0.1:8000/api/video/categories/`, formData)
			.then((res) => {
				setNewCatName('');
				setImage(null);
				setShowCreateForm(false);
				refreshCategories();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Header />
			<div style={{ height: '60px' }}></div>
			<div className='container'>
				<h1 className='text-center'>Category List</h1>
				<div className='container'>
					{categories.map((item) => (
						<CategoryItem
							key={item.id}
							item={item}
							refreshCategories={refreshCategories}
						/>
					))}

					<button
						className='btn btn-info'
						onClick={() => setShowCreateForm(!showCreateForm)}
						style={{ float: 'right', marginTop: '10px' }}
					>
						{' '}
						Create New Category
					</button>

					{showCreateForm ? (
						<div
							className='category-create-form'
							// style={{ justifyContent }}
						>
							<div class='container'>
								<input
									className={formStyles.input}
									type='text'
									name='category'
									placeholder='category name'
									onChange={(e) =>
										setNewCatName(e.target.value)
									}
								/>
							</div>
							<div className='container'>
								<input
									type='file'
									accept='image/*'
									id='image'
									name='image'
									onChange={(e) =>
										setImage({
											image: e.target.files,
										})
									}
								/>
							</div>
							<div className='container'>
								<button
									className='btn btn-danger'
									type='submit'
									onClick={handleSubmit}
								>
									Save changes
								</button>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}

export default CategoryList;
