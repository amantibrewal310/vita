import React, { useState } from 'react';
import formStyles from '../../css/forms.module.css';
import axios from 'axios';
import './categoryList.css';

function CategoryItem({ item, refreshCategories }) {
	const [showEditform, setShowEditForm] = useState(false);
	const [newCatName, setNewCatName] = useState(item.category);
	const [image, setImage] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newCatName === '') {
			return;
		}

		let formData = new FormData();
		formData.append('category', newCatName);
		if (image) {
			formData.append('image', image.image[0]);
		}
		console.log(formData);

		axios
			.patch(
				`http://127.0.0.1:8000/api/video/categories/${item.id}/`,
				formData
			)
			.then((res) => {
				setShowEditForm(false);
				refreshCategories();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='categoryWrapper'>
			<div className='category-container'>
				<img src={item.image} width='100px' alt='cat-image' />
				<h2>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</h2>
				<button
					className='btn btn-info'
					onClick={() => setShowEditForm(!showEditform)}
				>
					Edit
				</button>
			</div>

			{showEditform ? (
				<div className='container'>
					<div className='category-edit-form'>
						<div className='container'>
							<input
								className={formStyles.input}
								type='text'
								name='category'
								placeholder='updated name'
								value={newCatName}
								onChange={(e) => setNewCatName(e.target.value)}
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

							<button
								className='btn btn-danger'
								type='submit'
								onClick={handleSubmit}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default CategoryItem;
