import { useState , useEffect} from "react";


import Player from "./Components/Player";




function App() {

  const [songs] =useState([

    {
      title : "Aashiqui Aa Gayi",
      artist: "T series",
      img_src: "./images/img0.jpg",
      src : "./songs/Aashiqui Aa Gayi.mp3"
    },
    {
      title : "Lambiyaan Si Judaiyaan",
      artist: "Arijit Singh",
      img_src: "./images/img1.jpg",
      src : "./songs/Arijit Singh  Lambiyaan Si Judaiyaan.mp3"
    },
    {
      title : "Banjaara Full Video",
      artist: "Arjith Singh",
      img_src: "./images/img2.jpg",
      src : "./songs/Banjaara Full Video.mp3"
    },
    {
      title : "Bewafa Tera Masoom Chehra",
      artist: "Tseries",
      img_src: "./images/img3.jpg",
      src : "./songs/Bewafa Tera Masoom Chehra.mp3"
    },
    {
      title : "Bhar Do Jholi Meri",
      artist: "Adnan Sami",
      img_src: "./images/img4.jpg",
      src : "./songs/Bhar Do Jholi Meri.mp3"
    }
  ])

  const [SongIndex, SetSongIndex] = useState(0);

  const [Nextsong, SetNextsong] = useState(0);

  useEffect(()=>{
    SetNextsong(()=>{
      if(SongIndex + 1 > songs.length -1 ){
                 return 0
      }else{
        return SongIndex + 1
      }
    })

  }, [SongIndex, songs.length])





  return (
    <div className="App">
     
     <Player SongIndex = {SongIndex}
             SetSongIndex = {SetSongIndex}
             songs = {songs}
             Nextsong = {Nextsong}

     />
    
     
    </div>
  );
}

export default App;
