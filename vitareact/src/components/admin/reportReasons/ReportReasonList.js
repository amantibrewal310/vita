import React, { useEffect, useState } from 'react';
import formStyles from '../../css/forms.module.css';
import axios from 'axios';
import ReportReasonItem from './ReportReasonItem';
import Header from '../../Header';

function ReportReasonList() {
	const [reasons, setReasons] = useState([]);
	const [newReason, setNewReason] = useState();
	const [showCreateForm, setShowCreateForm] = useState(false);

	useEffect(() => {
		refreshReasons();
	});

	const refreshReasons = async () => {
		const res = await axios.get(
			`http://127.0.0.1:8000/api/video/report-reason/`
		);
		setReasons(res.data);
	};

	const handleSubmit = () => {
		if (newReason === '') {
			return;
		}

		axios
			.post(`http://127.0.0.1:8000/api/video/report-reason/`, {
				reason: newReason,
			})
			.then((res) => {
				setNewReason('');
				setShowCreateForm(false);
				refreshReasons();
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
				<h1 className='text-center'>Report Reason List</h1>
				<div className='container'>
					{reasons.map((item) => (
						<ReportReasonItem
							key={item.id}
							item={item}
							refreshReasons={refreshReasons}
						/>
					))}

					<button
						className={formStyles.btn}
						style={{ float: 'right', marginTop: '10px' }}
						onClick={() => setShowCreateForm(!showCreateForm)}
					>
						{' '}
						Create New Reason
					</button>

					{showCreateForm ? (
						<div className='category-create-form'>
							<div className='container'>
								<input
									className={formStyles.input}
									type='text'
									name='reason'
									placeholder='new reason'
									onChange={(e) =>
										setNewReason(e.target.value)
									}
								/>
							</div>
							<div className='container'>
								<button
									className={formStyles.btn_blue}
									type='submit'
									onClick={handleSubmit}
								>
									Save
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

export default ReportReasonList;
