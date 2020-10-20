import React, {useState} from 'react';
import axiosInstance from '../../axios';
import {useHistory} from 'react-router-dom';
import '../css/register.css';

function CreateVideo() {

    const history = useHistory();
    const initTextData = Object.freeze({
        title: '',
        description: ''
    });
    // TODO:
    // 1.
    // add form validation for file types 
    // both in react and django, add error types for files 
    // 2.
    // check for only admin upload
    const initErrors = {
        emptyFormError: null,
        authError: null
    }

    // states 
    const [textData, setTextData] = useState(initTextData);
    const [thumbnail, setThumbnail] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [error, setError] = useState(initErrors);

    // listener
    const handleChange = (e) => {
        if([e.target.name] == 'thumbnail') {
            setThumbnail({
                thumbnail: e.target.files
            });
        } else if([e.target.name] == 'videoFile') {
            setVideoFile({
                videoFile: e.target.files
            });
        } else {
            setTextData({
                ...textData,
                [e.target.name]: e.target.value
            });
        }
    }

    // listener
    // TODO: 
    // upload progress bar 
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate form
        if(!vaidateDetails()) {
            return;
        }

        let formData = new FormData();

        formData.append('title', textData.title.trim());
        formData.append('description', textData.description.trim());
        formData.append('thumbnail',thumbnail.thumbnail[0]);
        formData.append('videoFile', videoFile.videoFile[0]);
        console.log(formData);

        axiosInstance
            .post(`video/video-list/`, formData)
            .then(res => {
                history.push({
                    pathname: `/play/${res.data.id}`,
                });
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                if(err.data.detail == "Invalid token header. No credentials provided.") {
                    setError({
                        emptyFormError: null,
                        authError: 'No credentials provided, unauthorized.'
                    });
                }
            });
    }

    // form validators 
    const vaidateDetails = () => {
        if(textData.title === "" || textData.description === "" || thumbnail === null || videoFile === null) {
            // update the errors in form
            setError({
                authError: null,
                emptyFormError: 'Fill all fileds, upload all files'
            });
            return false;
        } else {
            // form is completely filled
            setError({
                authError:null,
                emptyFormError: null
            });
            return true;
        }
    }

    return (
        <div className='form-container'>
            {/* TODO:
                create seperate error component, 
                to be used it in all forms
            */}
            <div>{error.authError ? error.authError: ''}</div>
            <div>{error.emptyFormError ? error.emptyFormError: ''}</div>
            <h2>Create Video Page</h2>
            <form>
                <div>
                    <label>Title </label>
                    <input 
                        type="text" 
                        name="title"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description </label>
                    <input 
                        type="text" 
                        name="description"
                        onChange={handleChange}
                        required
                    /> 
                </div>
                <div>
                    <input 
                        type="file"
                        accept="image/*" 
                        id="thumbnail"
                        name="thumbnail"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input 
                        type="file"
                        accept="video/*" 
                        id="videoFile"
                        name="videoFile"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Create    
                </button>
            </form>
        </div>
    )
}

export default CreateVideo
