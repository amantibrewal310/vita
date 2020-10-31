import React from 'react'
import {useHistory} from 'react-router-dom'
import axiosInstance from '../../axios';
import formStyles from '../css/forms.module.css'

// Deletes video/comment 
// props - type, id, urlSuffix

function DeleteVidCom({type, id, urlSuffix}) {
    const history = useHistory();
    
    const handleDelete = () => {
        // take confirmation
        const confirmDelete = window.confirm(`This ${type} will be permanently removed!`);
        if(confirmDelete) {
            axiosInstance
            .delete(`${urlSuffix}${id}/`)
            .then(res => {
                if(res.status == 204) {
                    // TODO:
                    // show success message ${type} deleted
                    history.push('/admin');
                    window.location.reload();
                } else {
                    console.log(`${type} not deleted`);
                }
            })
            .catch(err => {
                console.log(`could not delete ${type}, not found`);
            });
        } 
    }

    return (
        <div>
            <button 
                onClick={handleDelete}
                className={formStyles.dangerBtn}
            >
                Delete {type}
            </button>
        </div>
    )
}

export default DeleteVidCom
