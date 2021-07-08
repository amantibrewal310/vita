import React, { useEffect, useState } from 'react';
import formStyles from '../../css/forms.module.css';
import axios from 'axios';
import '../categories/categoryList.css';

function ReportReasonList({ item, refreshReasons }) {
	const [newReason, setNewReason] = useState(item.reason);
	const [showEditForm, setshowEditForm] = useState(false);

	const handleSubmit = () => {
		if (newReason === '') {
			return;
		}

		axios
			.patch(
				`http://127.0.0.1:8000/api/video/report-reason/${item.id}/`,
				{
					reason: newReason,
				}
			)
			.then((res) => {
				setNewReason('');
				setshowEditForm(false);
				refreshReasons();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='categoryWrapper'>
			<div className='category-container'>
				<h6>{item.reason}</h6>

				<button
					className={formStyles.btn_blue}
					onClick={() => setshowEditForm(!showEditForm)}
				>
					{' '}
					Edit
				</button>
			</div>

			{showEditForm ? (
				<div className='container'>
					<div className='category-edit-form'>
						<div className='container'>
							<input
								className={formStyles.input}
								type='text'
								name='reason'
								placeholder='new reason'
								value={newReason}
								onChange={(e) => setNewReason(e.target.value)}
							/>
						</div>
						<div class='container'>
							<button
								className={formStyles.btn_red}
								type='submit'
								onClick={handleSubmit}
							>
								Save
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

export default ReportReasonList;
