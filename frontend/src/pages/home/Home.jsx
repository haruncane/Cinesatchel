import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import VideoCard from "../../components/videoCard/VideoCard";
import "./home.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({ format }) => {
  const [videoList, setVideoList] = useState([]);
  const [category, setCategory] = useState(null);
  const [popular, setPopular] = useState([]);
  const [term, setTerm] = useState(null);
  const [searchFeed, setSearchFeed] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getVideoList = async () => {
      try {
        const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos${format ? "?format=" + format : ""}${
          format && category ? "&category=" + category : ""}`, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        });
        //console.log(res);
        setVideoList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getSearchFeed = async () => {
      if (term !== null && term !== "") {
        try {
          const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos/search${term ? "?term=" + term : ""}`, {
            headers: { 
              token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
            }
          });
          //console.log(res);
          setSearchFeed(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    const getPopular = async () => {
      try {
        const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos/popular`, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        });
        //console.log(res);
        setPopular(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (JSON.parse(localStorage.getItem("user")).selectedprofile === null && JSON.parse(localStorage.getItem("user")).isAdmin === false)
      navigate('/profiles');
    getVideoList();
    getSearchFeed();
    getPopular();
    if (term === "")
      window.location.reload(false);
  },[format, category, navigate, term]);

  return (
    <div className="home">
      <Navbar format={format} setCategory={setCategory} setTerm={setTerm} page="home"/>
      <div className="container">
        {!format && term === null && (
          <>
            <h2 className="popularTitle">Popular on Cinesatchel</h2>
            <div className="popular">
              {Array.isArray(popular) ? (
                popular.map((video, index) => (
                  <VideoCard item={video} key={index} />
                ))
              ) : null}
            </div>
            <hr></hr>
          </>
        )}
        {term !== null && searchFeed.length !== 0 ? (
          <div className="feedRow">
            {Array.isArray(searchFeed) ? 
              searchFeed.map((video, index) => (
                <VideoCard item={video} key={index} />
              )) : null}
          </div>
        ) : (
          <div className="feedRow">
            {Array.isArray(videoList) ?
              videoList.map((video, index) => (
                <VideoCard item={video} key={index} />
              )) : null
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;