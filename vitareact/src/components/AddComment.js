import React, { useState, useRef } from 'react';
import axiosInstance from '../axios';
import formStyle from './css/forms.module.css';

// exports a comment fomr
// adds comment to comment list

// TODO:
// while adding comment send post request to commentLike model
function AddComment({ videoId, addCommentToList }) {
	const inputBoxRef = useRef(null);
	const [commentData, setCommentData] = useState({
		text: '',
		showButtons: false,
	});

	// on change input text
	const handleChange = (e) => {
		setCommentData({
			text: e.target.value,
			showButtons: e.target.value.length > 0,
		});
	};
	// on click submit
	const handleSubmit = () => {
		axiosInstance
			.post(`/video/comment-list/`, {
				text: commentData.text,
				video: videoId,
				created_at: '2020-01-01 00:00:00',
				// passing a sample datetime, django takes care of correct datetime
			})
			.then((res) => {
				console.log(res);
				// adding comment to list
				addCommentToList(res.data);
				// clear field
				cancelAddComment();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// on click cancel
	const handleCancel = (e) => {
		cancelAddComment();
	};
	// clear fields, set state
	const cancelAddComment = () => {
		inputBoxRef.current.value = '';
		setCommentData({
			text: '',
			showButtons: false,
		});
	};

	return (
		<div>
			<input
				type='text'
				name='text'
				onChange={handleChange}
				required
				ref={inputBoxRef}
				placeholder='Add a public comment'
				className={formStyle.input}
				style={{
					borderColor: 'white',
					width: '100%',
					backgroundColor: 'black',
				}}
			/>
			{commentData.showButtons ? (
				<div className={formStyle.buttonBox}>
					<button
						type='submit'
						onClick={handleSubmit}
						className={formStyle.smallSubmitBtn}
					>
						Comment
					</button>
					<button
						type='submit'
						onClick={handleCancel}
						className={formStyle.smallDangerBtn}
					>
						Cancel
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default AddComment;
