import React, { Component } from 'react';
import './css/videoplayer.css'

// exports video player 

class VideoPlayer extends Component {
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
      isShowingControls: true
    };
   
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
      // set the time using ref 
      // TODO: 
      // Not working 
      this.videoRef.current.currentTime = Math.round((this.state.completeDurationInSeconds * tempProgressPercentage) / 100);
      console.log(this.videoRef.current.currentTime);
    };
    
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
        volumeValue: this.videoRef.current.volume
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


   render() {

       let progressStyle = {
         width: this.state.progressPercentage + "%"
       };
       let volumeProgressStyle = {
         width: this.state.volumeValue * 100 + "%"
       };

       let video = this.props.video;

       return (
           <div>
           {/* Other video info */}

            <h1>{video.title}</h1>
            {/* <p>Description: {video.description}</p>
            <span>Video Likes: {video.likes} </span>
            <span> Video Disikes: {video.dislikes}</span> */}
           
           {/* Video player */}
           
           <div
             className={`videoPlayer ${
               this.state.isShowingControls ? "show-controls" : "hide-controls"
             }`}
             ref={this.videoPlayer}
             onMouseEnter={this.updateShowControls}
             onMouseLeave={this.updateHideControls}
           >
             <video
               src={video.videoFile}
               poster={video.thumbnail}
               ref={this.videoRef}
               // when video plays, update progress in progressbar
               onTimeUpdate={this.updateCurrentDuration}
               // update complete duration when video data is loaded   
               onLoadedData={this.updateCompleteDuration}
               onEnded={this.updateEnded}
               onVolumeChange={this.updateVolume}
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
                 
                 {/* volume controls */}
                 <div className="volume-controls">
                   <button className="control-btn" onClick={this.toggleVolume}>
                     {this.state.isVolumeOn ? (
                       <i className="fa fa-volume-up" aria-hidden="true"></i>
                     ) : (
                       <i className="fas fa-volume-mute" aria-hidden="true"></i>
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
                      
                  {/* play pause buttons */}
                 <div className="controls">
                   {this.state.isPlaying ? (
                     <button className="control-btn" onClick={this.handlePause}>
                       <i className="fa fa-pause" aria-hidden="true"></i>
                     </button>
                   ) : (
                     <button className="control-btn" onClick={this.handlePlay}>
                       <i className="fas fa-play" aria-hidden="true"></i>
                     </button>
                   )}
                 </div>
                 {/* play pause buttons */}

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

               </div>
             </div>
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
 