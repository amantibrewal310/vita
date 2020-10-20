import React, {useState, useEffect} from 'react';
import SingleComment from './SingleComment';
import axiosInstance from '../axios';
import {useHistory} from 'react-router-dom';

// props -> id of comment 

function GetSingleComment({id}) {
    const history = useHistory();
    const [comment, setComment] = useState({});

    useEffect(() => {
        axiosInstance
            .get(`/video/comment-list/${id}/`)
            .then(res => {
                setComment(res.data);
            })
            .catch(err => {
                if(err.data.detail === "Not found.") {
                    alert("Comment not found!");
                    history.goBack();
                }
            });
    }, []);

    return (
        <SingleComment comment={comment} />
    )
}


export default GetSingleComment
