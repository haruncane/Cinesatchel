import "./videoCard.scss"
import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SimilarFeed from "../similarFeed/SimilarFeed";


export default function VideoCard({ item, index }) {
  const [video, setVideo] = useState({});
  const [modal, setModal] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const profile = JSON.parse(localStorage.getItem("user")).selectedprofile;
 
  const toggleModal = () => {
    setModal(!modal);
    setTrailer(!true);
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos/find/` + item, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        });
        //console.log(res)
        setVideo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getVideo();
  }, [item]);

  const handleRating = async (e) => {
    e.preventDefault();
    const selectedRating = e.target.value;
    try {
      await axios.put(`https://cinesatchel-com-backend.vercel.app/api/videos/rate/${item}`, { ratings: [{ ratedby: profile, rate: selectedRating  }] }, {
        headers: { 
          token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
        }
      })
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="videoCard" style={{ backgroundImage: `url(${video.thumbnail})` }}>
        <div className="hoverBox">
          <div className="buttons">  
            <Link to="/player" state={{ video, trailer }} >
              <PlayCircleOutline className="hoverIcons" />
            </Link>
            <InfoOutlined className="hoverIcons" onClick={toggleModal}/>
          </div>
        </div>
        <div className="preInfo">
          <label>{video.releasedate}</label>
          <label>{video.puan}</label>
        </div>
        {modal && (
            <div className="modal">
              <div className="overlay">
                <div className="modalContent">
                  <button className="closeModal" onClick={toggleModal}>X</button>
                  <h2 className="videoLabel">{video.videoname}</h2>
                  <hr/>
                  <div className="videoDescription">
                    <p>
                      {video.description}
                    </p>
                  </div>
                  <div className="videoModalInfo">
                    <label>Categories</label>
                    <div>
                    {
                      video.categories.map(function(item, index) {
                        return <label key={`demo_snap_${index}`}>{ (index ? ', ' : '') + item }</label>;
                      })
                    }
                    </div> 
                    <label>Cast</label>
                    <label>{video.cast}</label>
                    <label>Director(s)</label>
                    <label>{video.director}</label>
                    <label>Duration</label>
                    <label>{video.duration}</label>
                    <label>ReleaseDate</label>
                    <label>{video.releasedate}</label>
                    <label>Limits</label>
                    <label>{video.limits}</label>
                    <label>Rating</label>
                    <label>{video.puan}</label>
                  </div>
                  <hr />
                  <div className="trailerNrating">
                    <Link to="/player" state={{ video, trailer }} >
                      <button className="trailerBtn">Watch Trailer</button>
                    </Link>
                    <select 
                      name="rating"
                      id="rating"
                      onChange={handleRating}
                    >
                      <option>Rate This {video.format}</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                  <div className="relatedVideos">
                    {video.format && (
                      <h3>Chapters</h3>
                    )}
                    <hr />
                    <div className="relatedFeed">
                      
                    </div>
                  </div>
                  <div className="similarArea">
                    <h3>Similars</h3>
                    <hr/>
                    <SimilarFeed current={video}/>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}