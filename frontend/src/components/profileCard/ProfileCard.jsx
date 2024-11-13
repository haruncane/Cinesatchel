import { PersonPin, RemoveCircleOutline } from "@mui/icons-material"
import "./profileCard.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ProfileCard({ item, index}) {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/')
  }
  const [profile, setProfile] = useState({});
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/users/find/${userId}/profiles/find/` + item, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        });
        //console.log(res)
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [userId, item]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://cinesatchel-com-backend.vercel.app/api/users/${userId}/profiles/`, { selectedprofile: profile._id }, {
        headers: { 
          token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
        }
      });
      let localUser = JSON.parse(localStorage.getItem("user"));
      localUser.selectedprofile = profile._id;
      localStorage.setItem("user", JSON.stringify(localUser));
      navigateToHome();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://cinesatchel-com-backend.vercel.app/api/users/${userId}/profiles/` + item, {
        headers: { 
          token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
        }
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profileCard">
      <RemoveCircleOutline className="deleteIcon" onClick={handleClickOpen} />
      <div className="profileBox" onClick={handleSelect}>
        <label>{profile.profilename}</label>
        <PersonPin className="profileIcon" />
      </div>
      <div>
      <Dialog
        open={open}
        onClose={handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          
          color: 'black'
        }}
      >
        <DialogTitle 
          id="alert-dialog-title"
          sx={{
            background: 'black',
            color: 'white'
          }}
        >
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent
          sx={{
            background: 'black',
          }}
        >
          <DialogContentText 
            id="alert-dialog-description"
            sx={{
              color: 'white'
            }}
          >
            Are you sure you want to delete "{profile.profilename}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            background: 'black'
          }}
        >
          <Button 
            onClick={handleClose} 
            sx={{
              color: 'white'
            }}
          >Cancel</Button>
          <Button 
            onClick={handleDelete}
            sx={{
              color: 'red'
            }}
          >Delete</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}