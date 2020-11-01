import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import '../css/adminHome.css';
import axiosInstance from '../../axios';
import VideoResults from './VideoResults';
import CommentResults from './CommentResults';
import Header from '../Header';
import formStyles from '../css/forms.module.css'
import Preloader from '../utils/Preloader';
import { Col, Container, Row } from 'react-bootstrap';
import Widget from '../Widget';
import WidgetBar from '../WidgetBar';
import WidgetPie from '../WidgetPie';


function Admin() {

    const initHeading = {
        videoHeading: 'Recent Video Reports',
        commentHeading: 'Recent Comment Reports'
    }

    const [boxHeading, setBoxHeading] = useState(initHeading);
    const [videoResults, setVideoResults] = useState([]);
    const [commentResults, setCommentResults] = useState([]);
    const [videoResLoading, setVideoResLoadingLoading] = useState(true);
	const [commentResLoading, setCommentResLoading] = useState(true);
	
	const chartData = [
		{
			label: 'Venezuela',
			value: '290',
		},
		{
			label: 'Saudi',
			value: '260',
		},
		{
			label: 'Canada',
			value: '180',
		},
		{
			label: 'Iran',
			value: '140',
		},
		{
			label: 'Russia',
			value: '115',
		},
	];

    useEffect(() => {
        // recent reported videos 
        axiosInstance
            .get(`video/reported-video-list/`)
            .then(res => {
                setVideoResults(res.data);
                setVideoResLoadingLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        // recent reported comments 
        axiosInstance
            .get(`video/reported-comment-list/`)
            .then(res => {
                setCommentResults(res.data);
                setCommentResLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])


	return (
		<>
			<Header />
			<div style={{ height: '60px' }}></div>
			<h1 className='text-center'>Admin Panel</h1>
			<Container>
				<Row>
					<Col>
						<Widget
							title={'Upload Video'}
							description={'Create a new video'}
							buttonName={'Upload'}
							buttonPath={'/'}
						/>
					</Col>
					<Col>
						<Widget
							title={'Total Video'}
							description={'videos are uploaded'}
							value={'100'}
						/>
					</Col>
					<Col>
						<Widget
							title={'Membership'}
							description={'Types of Membership available'}
							value={'3'}
						/>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<WidgetBar data={chartData} title={'Subscription Graph'} />
				</Row>
			</Container>
			<Container>
				<Row>
					<WidgetPie data={chartData} title={'Revenue Model Graph'} />
				</Row>
			</Container>
		</>
	)

	
	/*
		// Admin Changes by @harshjoeyit
		// include video, comment report list 

    return (
        <>
        <Header />
        <div>
            <h1 style={{textAlign:'center'}}>Admin Home</h1>
            
            <Link 
                to={`/admin/create`}>
                <button 
                    className={formStyles.submitBtn}>
                    Create New Video
                </button>
            </Link>

            <div style={{display: 'flex', justifyContent: 'center'}}>  
                <button className={formStyles.smallSubmitBtn}>Most views</button>
                <button className={formStyles.smallSubmitBtn}>Most Likes</button>
                <button className={formStyles.smallSubmitBtn}>Most Reported</button>
            </div>

            <div className="row">
                <div className="col">
                    <h2>{boxHeading.videoHeading}</h2>
                    {
                        (videoResLoading)
                        ? (
                            <div style={{width: '200px', height: '200px'}}>
                                <Preloader />
                            </div>
                        ) : (
                            <VideoResults allVideos={videoResults}/>
                        )
                    }
                </div>
                <div className="col">
                <h2>{boxHeading.commentHeading}</h2>
                    {
                        (commentResLoading)
                        ? (
                            <div style={{width: '200px', height: '200px'}}>
                                <Preloader />
                            </div>
                        ) : (
                            <CommentResults allComments={commentResults}/>
                        )
                    }
                </div>
				
            </div>
        </div>
        </>
	)
	
	*/
}

export default Admin;
