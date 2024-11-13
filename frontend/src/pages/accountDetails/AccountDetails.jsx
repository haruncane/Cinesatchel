import "./accountDetails.scss";
import Navbar from "../../components/navbar/Navbar"
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";

const AccountDetails = () => {
    const navigate = useNavigate();
    const navigateToProfiles = () => {
        navigate('/profiles')
    }

    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
          await axios.delete(`https://cinesatchel-com-backend.vercel.app/api/users/${user._id}`, {
            headers: { 
              token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
            }
          });
          localStorage.setItem("user", null)
          window.location.reload(false);
        } catch (err) {
          console.log(err);
        }
    };
    
  return (
    <div className="accountDetails">
        <Navbar page="account" />
        <div className="container">
            <div className="top">
                <label className="accountTitle">{user.username}</label>
                <div className="mamberSince">
                    <label>Member Since</label>
                    <label>{user.createdAt.substring(0, 10)}</label>
                </div>
            </div>
            <hr></hr>
            <div className="mid">
                <label>Name</label>
                <label>{user.username}</label>
                <label>Surname</label>
                <label>{user.usersurname}</label>
                <label>Email</label>
                <label>{user.email}</label>
            </div>
            <hr></hr>
            <div className="bot">
                <button className="profilesBtn" onClick={navigateToProfiles}>Profiles</button>
                <button className="deleteAccountBtn" onClick={handleClickOpen}>Delete Account</button>
            </div>
        </div>
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
                Are you sure you want to delete "{user.username}"?
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
  )
}

export default AccountDetails;