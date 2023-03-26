import React from 'react'

function Details(props) {
    let x= props.currentImageIndex
  return (
    <div className='details'>
      
      <h3 id = "title" className='details_title'>{props.songs.title}</h3>
      <h3 id = "artist" className='details_Artist'>{props.songs.artist}</h3>

      <div className='details_img'>
             <img className='details__img'src={props.imageUrls[x]} alt={`music ${props.x}`}></img>
      </div>

      
    </div>
  )
}

export default Details