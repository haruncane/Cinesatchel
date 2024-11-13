import { Loupe } from "@mui/icons-material";
import ProfileCard from "../../components/profileCard/ProfileCard";
import "./profiles.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Profiles = () => {
  const [modal, setModal] = useState(false);
  const [profileList, setProfileList] = useState([]);
  const [newProfile, setNewProfile] = useState({});
  const [count, setCount] = useState(0);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const toggleModal = () => {
    setModal(!modal);
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setNewProfile({ ...newProfile, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://cinesatchel-com-backend.vercel.app/api/users/${userId}/profiles`, newProfile, {
        headers: { 
          token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
        }
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getProfileList = async () => {
      try {
        const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/users/${userId}/profiles`, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        });
        //console.log(res);
        setProfileList(res.data);
        setCount(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    getProfileList();
  },[userId]);

  return (
    <div className="profiles">
      <div className="container">
        {profileList.map((profile, index) => (
          <ProfileCard item={profile} key={index} />
        ))}
        {count <= 3 && (
          <div className="addProfile" onClick={toggleModal}>
            <label>New Profile</label>
            <Loupe className="profileIcon" />
          </div>
        )}
        {modal && (
            <div className="modal">
              <div className="overlay">
                <div className="modalContent">
                  <button className="closeModal" onClick={toggleModal}>X</button>
                  <h2 className="profileLabel">New Profile</h2>
                  <form className="profileFormInfo">
                    <label>Profile Name</label>
                    <input type="text" name="profilename" onChange={handleChange}></input>
                    <button onClick={handleSubmit}>Create Profile</button>
                  </form>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Profiles;