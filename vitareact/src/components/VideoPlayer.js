import React, { Component } from 'react';
import './css/videoplayer.css'
import axiosInstance from '../axios'
import screenfull from 'screenfull'
import ReportVideo from './ReportVidCom'

// exports video player 
// TODO: 
// 1. Title hover top over video player and disppear on mouse leave, appear on mouse enter 
// 2. Custom control disapper on Full Screen
// 4. Theater mode
// 5. Picture in picture

class VideoPlayer extends Component {
    _isMounted = false;

    constructor(props) {
      super(props);
      // creating refs to the elements we need to control, or get data 
      this.videoPlayer = React.createRef(); 
      this.videoRef = React.createRef(); 
      this.progressBar = React.createRef(); 
      this.progress = React.createRef(); 
      this.volumeProgress = React.createRef();
    }
     
    state = {
      currentTimeInSeconds: 0,
      completeDurationInSeconds: 0,
      currentDuration: { hours: "00", minutes: "00", seconds: "00" },
      completeDuration: { hours: "00", minutes: "00", seconds: "00" },
      isPlaying: false,
      progressPercentage: 0,
      isVolumeOn: true,
      volumeValue: 0.5,
      volumePercentage: 50,
      isShowingControls: true,
      playbackRate: 1.0,
      // video data states
      like: false,
      dislike: false,
      videoLikes: this.props.video.likes,
      videoDislikes: this.props.video.dislikes,
      // report
      report: true
    };

    componentDidMount() {
      // find the like dislike status, set state to show users previous actions
      this._isMounted = true;
      this.getVoteStatus();
    }
   
    componentWillUnmount() {
      this._isMounted = false;
    }

    /*
     onLoadedData:
     we need to update the completeDurationInSeconds and completeDuration
    */
    updateCompleteDuration = () => {
      let tempDur = this.videoRef.current.duration;
      this.setState({
        // set complete time, and formatted duration  
        completeDurationInSeconds: tempDur,
        completeDuration: calculateDuration(tempDur)
      });
    };
   
    /*
     onTimeUpdate: 
     update progressPercentage
    */
    updateCurrentDuration = () => {
      let tempCurrentTime = this.videoRef.current.currentTime;
      let tempDur = this.state.completeDurationInSeconds;
      
      this.setState({
        // set current time in sec
        currentTimeInSeconds: tempCurrentTime,
        // set formatted duration 
        currentDuration: calculateDuration(tempCurrentTime),
        // set progress percentage 
        progressPercentage: getPercentage(tempCurrentTime.toFixed(2), tempDur.toFixed(2))
      });
    };
   
    /*
     onEnded - once the video is ended set the isPlaying state to false
    */
    updateEnded = () => {
      this.setState({ 
        isPlaying: false, 
        isShowingControls: true 
      });
      // back to start state 
      this.videoRef.current.currentTime = 0;
    };
   
    /*
      handles click to play
    */
    handlePlay = () => {
      this.videoRef.current.play();
      this.setState({ isPlaying: true });
    };
   
    /*
      handles click to pause 
    */
    handlePause = () => {
      this.videoRef.current.pause();
      this.setState({ isPlaying: false });
    };
   
    /*
      handles the click on the progressbar
     
      How to Calculate the ProgressPosition
       ==> Get the x-coordinate value of the pointer clicked using e.pageX (gives the x position)
       ==> get the position of the videoPlayer from left
       ==> set the progressPosition = e.pageX - this.videoPlayer.current.offsetLeft (gives the click position on the video player)
       ==> we need to calculate the progress bar percentage based on the click - ( click Position / video player width) * 100 --> percentage
     
      Setting the current time
       ==> currentTime = (click position * video complete duration in seconds) / progressbar width
    */
    handleProgress = (e) => {
      // offset is calculated from first ancestor that has other than static positioning 
      let tempProgressWidth = e.pageX - this.videoPlayer.current.offsetLeft;
      let tempProgressPercentage = getPercentage(tempProgressWidth, this.videoPlayer.current.clientWidth)
      // set progress precentage
      this.setState({
        progressPercentage: tempProgressPercentage
      });
      this.videoRef.current.currentTime = Math.round((this.state.completeDurationInSeconds * tempProgressPercentage) / 100);
    };
    
    /*
      Skip forward 
    */
    skipForward = () => {
      let currTime = this.videoRef.current.currentTime;
      let timeAfterSkip = Math.min(currTime + 10, this.state.completeDurationInSeconds);
      // console.log(timeAfterSkip);
      let tempProgressPercentage = getPercentage(timeAfterSkip, this.state.completeDurationInSeconds);
      this.setState({
        progressPercentage: tempProgressPercentage
      });
      this.videoRef.current.currentTime = timeAfterSkip;
    }
    /*
      Skip backward
    */
    skipBackward = () => {
      let currTime = this.videoRef.current.currentTime;
      let timeAfterSkip = Math.max(currTime - 10, 0);
      let tempProgressPercentage = getPercentage(timeAfterSkip, this.state.completeDurationInSeconds);
      this.setState({
        progressPercentage: tempProgressPercentage
      });
      this.videoRef.current.currentTime = timeAfterSkip;
    }
    /* 
      playback rate
    */
    increasePlayRate = () => {
      if(this.state.playbackRate == 2.0) {
        return;
      }
      this.setState({
        playbackRate: this.state.playbackRate + 0.25
      })
      this.videoRef.current.playbackRate += 0.25;
    }
    decreasePlayRate = () => {
      if(this.state.playbackRate == 0.25) {
        return;
      }
      this.setState({
        playbackRate: this.state.playbackRate - 0.25
      })
      this.videoRef.current.playbackRate -= 0.25;
    }

    /* 
      mute/unmute 
    */
    toggleVolume = () => {
      this.setState({ isVolumeOn: !this.state.isVolumeOn });
      this.videoRef.current.volume = this.videoRef.current.volume
        ? 0
        : this.state.volumeValue;
    };
     
    updateVolume = () => {
      this.setState({
        volumePercentage: this.videoRef.current.volume * 100
      });
    };
   
    setVolume = (e) => {
      let tempVolumeWidth = e.pageX - this.videoPlayer.current.offsetLeft - this.volumeProgress.current.offsetLeft;
      let tempVolumeValue = tempVolumeWidth / this.volumeProgress.current.clientWidth;

      this.setState({
        volumeValue: tempVolumeValue,
        isVolumeOn: true
      });
      // set volume on video 
      this.videoRef.current.volume = tempVolumeValue;
      this.setState({
        volumeValue: tempVolumeValue,
        isVolumeOn: true
      });
    };
   
    updateShowControls = () => {
      this.setState({ isShowingControls: true });
    };
    
    // TODO: 
    // Hide controls after 3 seconds after mouse leave 
    updateHideControls = () => {
      if (!this.videoRef.current.paused && !this.videoRef.current.ended) {
        this.setState({ isShowingControls: false });
      }
    };

    onToggleFullScreen = () => {
      screenfull.toggle(this.videoPlayer.current);
    }

    // ....................like/dislike handlers ....................
    /* 
      check status of vote 
    */
    getVoteStatus = () => {
      axiosInstance
        .post(`video/video-vote/`, {
          video: this.props.video.id,
          action: 'checkStatus'
        })
        .then(res => {
          this.setVoteStatus(res.data.status);
        })
        .catch(err => {
          console.log(err);
        });
    }
    /* 
      set status for buttons to glow
    */
    setVoteStatus = (status) => {
      if(status == 'like') {
        this.setState({
          like: true,
          dislike: false
        });
      } else if(status == 'dislike') {
        this.setState({
          like: false,
          dislike: true
        });
      } else {
        this.setState({
          like: false,
          dislike: false
        });
      }
    }
    /* 
      get final likes/dislikes
    */
    getVoteCount = () => {
      axiosInstance
        .get(`video/video-list/${this.props.video.id}`)
        .then(res => {
          this.setState({
            videoLikes: res.data.likes,
            videoDislikes: res.data.dislikes
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
    /*
      like/dislike pressed 
    */
    handleVote = (action) => {
      const body = {
        video: this.props.video.id,
        action: action
      };
      axiosInstance
        .post(`video/video-vote/`, body)
        .then(res => {
          this.setVoteStatus(res.data.status);
          this.getVoteCount();
        })
        .catch(err => {
          console.log(err);
        });
    }
    /*
      like pressed 
    */
    handleLike = () => {
      this.handleVote('like');
    }
    /*
      dislike pressed 
    */
    handleDislike = () => {
      this.handleVote('dislike');
    }
    /*
      report
    */
    toggleReportBtn = () => {
      this.setState({
        report: !this.state.report
      });
    }


   render() {

      let progressStyle = {
        width: this.state.progressPercentage + "%"
      };
      let volumeProgressStyle = {
        width: this.state.volumePercentage + "%"
      };

       let video = this.props.video;

       return (
          <div>
            {/* Title */}
            <h1>{video.title}</h1>
           
            {/* Video player */}

            <div
             className={`videoPlayer ${
               this.state.isShowingControls ? "show-controls" : "hide-controls"
             }`}
             ref={this.videoPlayer}
             onMouseEnter={this.updateShowControls}
             onMouseLeave={this.updateHideControls}
             onDoubleClick={this.onToggleFullScreen}
           >
             <video
               id='main-video-player'
               src={video.videoFile}
               poster={video.thumbnail}
               ref={this.videoRef}
               // when video plays, update progress in progressbar
               onTimeUpdate={this.updateCurrentDuration}
               // update complete duration when video data is loaded   
               onLoadedData={this.updateCompleteDuration}
               onEnded={this.updateEnded}
               onVolumeChange={this.updateVolume}
               allowFullScreen
             />
             
             <div className="video-info">
               
               {/* progress bar  */}
               <div
                 className="progress-bar"
                 ref={this.progressBar}
                 onClick={e => this.handleProgress(e)}
               >
                 <span
                   className="progress"
                   style={progressStyle}
                   ref={this.progress}
                 />
               </div>
               {/* progress bar  */}
               
               <div className="video-controls">
                 
                 <div className='left-side-controls'>
                    {/* volume controls */}
                    <div className="volume-controls">
                      <button className="control-btn" onClick={this.toggleVolume}>
                        {this.state.isVolumeOn ? (
                          <i className="fa fa-volume-up" aria-hidden="true" title='mute'></i>
                        ) : (
                          <i className="fas fa-volume-mute" aria-hidden="true" title='unmute'></i>
                        )}
                      </button>
                      <div
                        className="volume-progressbar"
                        ref={this.volumeProgress}
                        onClick={e => this.setVolume(e)}
                      >
                        <span
                          className="volume-progress"
                          style={volumeProgressStyle}
                        />
                      </div>
                    </div>
                    {/* volume controls */}
                    
                    {/* playbackrate */}
                    <div className='playback-rate'>
                      <div className='playback-meter'></div>
                      <div className='playback-value'>{this.state.playbackRate}X</div>
                      <div className='playback-btn'>
                        <i className="fa fa-chevron-circle-up" aria-hidden="true" onClick={this.increasePlayRate}></i>
                        <i className="fa fa-chevron-circle-down" aria-hidden="true" onClick={this.decreasePlayRate}></i>
                      </div>
                    </div>
                 </div>
                 

                  {/* skip backward button */}
                  <div className='center-controls'>
                    <div id="backward-skip" className='skip-btn' onClick={this.skipBackward} title='skip -10s'>
                    </div>  
                      
                     {/* play pause buttons */}
                    <div className="controls">
                      {this.state.isPlaying ? (
                        <button className="control-btn" onClick={this.handlePause}>
                          <i className="fa fa-pause" aria-hidden="true" title='pause'></i>
                        </button>
                      ) : (
                        <button className="control-btn" onClick={this.handlePlay}>
                          <i className="fas fa-play" aria-hidden="true" title='play'></i>
                        </button>
                      )}
                    </div>
                    {/* play pause buttons */}
                      
                    {/* skip forward button */}
                    <div id="forward-skip" className='skip-btn' onClick={this.skipForward} title='skip 10s'>
                    </div> 
                  </div> 

                  <div className="right-side-controls">
                    {/* time controls */}
                    <div className="time-control">
                      <div className="start-time time">
                        {this.state.currentDuration.hours}:
                        {this.state.currentDuration.minutes}:
                        {this.state.currentDuration.seconds}
                      </div>
                      <div className="time-slash"> / </div>
                      <div className="end-time time">
                        {this.state.completeDuration.hours}:
                        {this.state.completeDuration.minutes}:
                        {this.state.completeDuration.seconds}
                      </div>
                    </div>
                    {/* time controls */} 

                    {/* options button */}
                    {/* <div className='options-btn' title='options'>
                    </div>   */}

                    {/* full screen button */}
                    <div className='fullscreen-btn' onClick={this.onToggleFullScreen} title='fullscreen'>
                    </div>  
                  </div>
               </div>
             </div>
           </div>
                    
            {/* Other video details */}
            <div>
               <span>Description: {video.description}</span>
               <span className='vote-btn' onClick={this.handleLike}>
                 <i className={"fa fa-thumbs-o-up" + (this.state.like ? " like" : "")} 
                    aria-hidden="true">
                  </i>
                 {this.state.videoLikes} 
               </span> 
               <span className='vote-btn' onClick={this.handleDislike}> 
                 <i className={"fa fa-thumbs-o-down" + (this.state.dislike ? " dislike" : "")}
                    aria-hidden="true">
                  </i>
                 {this.state.videoDislikes}
               </span>

               {/* report */}

               { this.state.report ? (
                   <span className='report-btn' onClick={this.toggleReportBtn}>
                    <i className="fa fa-flag-o" 
                      aria-hidden="true">
                    </i>
                   </span>
                  ):(
                   <ReportVideo type="video" id={this.props.video.id} toggleReportBtn={this.toggleReportBtn} />
                  )
               }
               
            </div>
          </div>
       )
   }
}

export default VideoPlayer

/*
  param - time in seconds (float)
  return - duration in format {hours:00,minutes:00,seconds:00}
*/
const calculateDuration = (duration) => {
   let seconds = parseInt(duration % 60);
   let minutes = parseInt((duration % 3600) / 60);
   let hours = parseInt(duration / 3600);
   let formattedTime = {
    hours: hours.toFixed().padStart(2,'0'),
    minutes: minutes.toFixed().padStart(2,'0'),
    seconds: seconds.toFixed().padStart(2,'0')
   };
  
   return formattedTime;
 };
 
 const getPercentage = (presentVal, total) => {
   let percentage = (presentVal / total) * 100;
   return Math.round(percentage);
 };
 