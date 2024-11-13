import axios from "axios";
import "./player.scss"
import { useLocation } from "react-router-dom"
import { useState } from "react";

export default function Player() {
  const location = useLocation();
  const video = location.state?.video;
  const trailer = location.state?.trailer;
  const [played, setPlayed] = useState(false);
  //console.log(video)

  const handlePlay = async () => {
    if (!played) {
      try {
        await axios.put(`https://cinesatchel-com-backend.vercel.app/api/videos/${video._id}`, { playcount: video.playcount + 1 }, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        })
        setPlayed(true);
      } catch  (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="player">
      {trailer ? (
        <video 
          className="video"
          autoPlay
          controls
          src={video.trailer}
       />
      ) : (
        <video 
            className="video"
            autoPlay
            controls
            src={video.video}
            onPlay={handlePlay}
        />
      )}
    </div>
  )
}
