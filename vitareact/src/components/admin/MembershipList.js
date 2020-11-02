import React, { useEffect, useState } from 'react';
import Header from '../Header';
import '../css/table.css';
import { getAllMembershipsType } from '../../request';

function MembershipList() {
	const [memberships, setMemberships] = useState([]);

	useEffect(() => {
		getAllMembershipsType().then((res) => {
			setMemberships(res);
		});
	}, []);
	return (
		<>
			<Header />
			<div style={{ height: '60px' }}></div>
			<h1 className='text-center' style={{margin: '50px'}}>Memberships Available</h1>
			<div className='container'>
				<table className='container'>
					<thead>
						<tr>
							<th>Sr No.</th>
							<th>Membershipt Type</th>
							<th>Price</th>
						</tr>
					</thead>
					{memberships.map((membership, index) => {
						return (
							<tbody key={membership.id}>
								<tr>
									<td>{index + 1}</td>
									<td>{membership.memebership_type}</td>
									<td>{membership.price}</td>
								</tr>
							</tbody>
						);
					})}
				</table>
				{/* <button className='btn btn-info' style={{ float: 'right' }}>
					Add
				</button> */}
			</div>
		</>
	);
}

export default MembershipList;
