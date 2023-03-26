import React, { useEffect, useRef, useState} from "react";
import Details from "./Details";
import Control from "./Control";

import axios from 'axios';

const ACCESS_KEY = '3j6FPXgzeIfjo3AIzGqrOKRQ-hf531_nQmoiC9o-uFU';

function Player(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioEl = useRef(null)

  const [isPlaying, setisPlaying] = useState(false)

  useEffect(()=>{
     if(isPlaying){
      audioEl.current.play()
     } else {
      audioEl.current.pause()
     }

  })
  useEffect(() => {
    audioEl.current.addEventListener('loadedmetadata', () => {
      setDuration(audioEl.current.duration);
    });
    audioEl.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioEl.current.currentTime);
    });
  }, []);

  //  Getting data from unplash for images usining axios

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: 'music',
            per_page: 20,
            page: 1
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`
          }
        });

        setImageUrls(response.data.results.map(result => result.urls.regular));
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchImages();
  }, []);
  
  function handleNextButtonClick() {
    setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % imageUrls.length);
  }

  function handleSeek(event) {
    const time = parseFloat(event.target.value);
    audioEl.current.currentTime = time;
    setCurrentTime(time);
  }

  // Concerting to MM:SS format

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
    
  const handleEnded = () => {
    const nextSongIndex = (props.SongIndex + 1) % props.songs.length;
    props.SetSongIndex(nextSongIndex);
    audioEl.current.src = props.songs[props.SongIndex].src;
    audioEl.current.play();
  };
  return (
    <div className="player">
      <Details songs={props.songs[props.SongIndex]}
                imageUrls = {imageUrls}
                currentImageIndex= {currentImageIndex}/>
      
      
     <div className="player_audionew">
     <audio src={props.songs[props.SongIndex].src} ref={audioEl} onEnded={handleEnded} /> 
      
      <input className="ranges"
        type="range"
        min={0}
        max={duration}
        step={0.01}
        value={currentTime}
        onChange={handleSeek}
      />
      <div className="time">
      <div className="currentTime">{formatTime(currentTime)}</div>
      <div className="duration">{formatTime(duration)}</div>
      </div>
      </div>
      <p>
    
 
      </p>
      <Control isPlaying={isPlaying}
               setisPlaying={setisPlaying}
              //  skipSong = {skipSong}
               handleClick={handleNextButtonClick}
               
               vSongIndex = {props.SongIndex}
             vSetSongIndex = {props.SetSongIndex}
             vsongs={props.songs}
      />
    </div>
  );
}

export default Player;
