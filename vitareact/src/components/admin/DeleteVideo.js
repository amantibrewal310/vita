import React from 'react'
import {useHistory} from 'react-router-dom'
import axiosInstance from '../../axios';

function DeleteVideo({id}) {
    const history = useHistory();

    const handleDelete = () => {
        // take confirmation
        const confirmDelete = window.confirm('This video will be permanently removed!');
        if(confirmDelete) {
            axiosInstance
            .delete(`video/video-list/${id}/`)
            .then(res => {
                if(res.status == 204) {
                    // TODO:
                    // show success message 
                    history.push({
                        pathname: '/admin/',
                    });
                    window.location.reload();
                } else {
                    console.log('video not deleted');
                }
            })
            .catch(err => {
                console.log('could not delete video, not found');
            });
        } 
    }

    return (
        <div>
            <h2>Delete Video</h2>
            <button onClick={handleDelete}>Confirm Delete</button>
        </div>
    )
}

export default DeleteVideo
