import { useEffect, useState } from "react";
import "./similarFeed.scss";
import axios from "axios";
import VideoCard from "../videoCard/VideoCard";

export default function SimilarFeed({ current }) {
    const [similars, setSimilars] = useState([]);
    const id = current._id;

    useEffect(() => {
        const getSimilars = async () => {
          try {
            const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos/find/${id}/similars` , {
              headers: { 
                token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
              }
            });
            //console.log(res)
            setSimilars(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getSimilars();
      }, [id]);

  return (
    <div className="similarFeed">
        {similars.map((video, index) => (
              <VideoCard item={video} key={index} />
        ))}
    </div>
  )
}
