import React from 'react';
import {Link, useParams} from 'react-router-dom';
import GetSingleComment from '../GetSingleComment';
import Header from '../Header';
import DeleteComment from './DeleteVidCom';
import ReportList from './ReportListVidCom'; 
import formStyles from '../css/forms.module.css';

const heading = {
    marginTop: '20px',
    textAlign: 'center'
}
const container = {
    width: '97vw',
    margin: 'auto'
}

// TODO: 
// display the video details too on which this comment was made 
function CommentDetail() {
    // get it from params
    const {id} = useParams();
    return (
        <>
        <Header />
        <div style={container}>
            <h1 style={heading}>Comment Details</h1>
            
            <GetSingleComment id={id} />
            
            <h2 style={heading}>Report List</h2>
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <ReportList type="comment" id={id}/>
            </div>
            
            <Link to={`../comment-report-action/${id}`}>
                <button 
                    className={formStyles.smallSubmitBtn}
                >
                    View Reports 
                </button>
            </Link>
            
            <DeleteComment type="Comment" urlSuffix="video/comment-list/" id={id} />
        </div>
        </>
    )
}

export default CommentDetail
