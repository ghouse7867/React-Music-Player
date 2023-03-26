import React from 'react'
import {faBackward, faPause, faForward , faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Control(props) 
{
  const handleForward = () => {
    props.vSetSongIndex((index) => {
      index=props.vSongIndex
      console.log(index)
      let nextIndex = index +1;
      if (nextIndex >= props.vsongs.length) {
        nextIndex = 0; // loop back to the first song
      }
      return nextIndex;
    });
  };
  
  const handleBackward = () => {
    props.vSetSongIndex((index) => {
      index = props.vSongIndex
      console.log(index)
      let prevIndex = index - 1;
      if (prevIndex < 0) {
        prevIndex = props.vsongs&&props.vsongs.length - 1; // loop back to the last song
      }
      return prevIndex;
    });
  };


  return (
    <div className='control'>
       <button className='control_skipBtn' onClick={ ()=>{
           
               props.handleClick();
              
               handleBackward();
       }
       }>
             <FontAwesomeIcon  icon = {faBackward}  />
       </button>
       <button className='control_Playbutton' onClick={ ()=>
        props.setisPlaying(!props.isPlaying)
       }>
             <FontAwesomeIcon  icon = {props.isPlaying ? faPause : faPlay}  />
       </button>
       <button className='control_skipBtn' onClick={ ()=>{
            
        props.handleClick();
        handleForward();
       }
        
       }>
             <FontAwesomeIcon  icon = {faForward}  />
       </button>
    </div>
  )
}

export default Control