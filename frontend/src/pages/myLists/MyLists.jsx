import Navbar from "../../components/navbar/Navbar";
import ListCard from "../../components/listCard/ListCard";
import "./myLists.scss"
import { Add } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";

const MyLists = () => {
  const [modal, setModal] = useState(false);
  const [myLists, setMyLists] = useState([]);
  const [newList, setNewList] = useState({});
  const { user } = useContext(AuthContext);
  

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
    setNewList({ ...newList, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://cinesatchel-com-backend.vercel.app/api/users/${JSON.parse(localStorage.getItem("user"))._id}/profiles/${
        JSON.parse(localStorage.getItem("user")).selectedprofile}/lists`, newList, {
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
    const getMyLists = async () => {
      try {
        const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/users/${JSON.parse(localStorage.getItem("user"))._id}/profiles/${JSON.parse(localStorage.getItem("user")).selectedprofile}/lists`, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        });
        //console.log(res);
        setMyLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyLists();
  }, [user]);
  

  return (
    <div className="myLists">
        <Navbar page="list" />
        <div className="container">
        {myLists.map((list, index) => (
          <ListCard item={list} key={index} />
        ))}
          <div className="addList" onClick={toggleModal}>
            <h2>New List</h2>
            <Add className="centerIcon"/>
          </div>
          {modal && (
            <div className="modal">
              <div className="overlay">
                <div className="modalContent">
                  <button className="closeModal" onClick={toggleModal}>X</button>
                  <h2 className="listLabel">New List</h2>
                  <form className="listFormInfo">
                    <label>List Name</label>
                    <input type="text" name="listname" onChange={handleChange}></input>
                    <button onClick={handleSubmit}>Create List</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default MyLists