import { Movie, RemoveCircleOutline } from "@mui/icons-material";
import "./listCard.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ListCard({ item, index }) {
  const [list, setList] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/users/find/${JSON.parse(localStorage.getItem("user"))._id}/profiles/find/${JSON.parse(localStorage.getItem("user")).selectedprofile}/lists/find/` + item, {
          headers: { 
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
          }
        });
        //console.log(res)
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, [item]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://cinesatchel-com-backend.vercel.app/api/users/${JSON.parse(localStorage.getItem("user"))._id}/profiles/${JSON.parse(localStorage.getItem("user")).selectedprofile}/lists/` + item, {
        headers: { 
          token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
        }
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  } 

  return (
    <div className="listCard">
      <RemoveCircleOutline className="deleteIcon" onClick={handleClickOpen} />
      <div className="listBox">
        <h2>{list.listname}</h2>
        <Movie className="centerIcon"/>
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
            Are you sure you want to delete "{list.listname}"?
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
