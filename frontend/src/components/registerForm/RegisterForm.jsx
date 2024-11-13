import { useState } from "react";
import "./registerForm.scss"
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
 
export default function RegisterForm() {
    const [modal, setModal] = useState(false);
    const [newUser, setNewUser] = useState({});
    const [open, setOpen] = useState(false);
    const [registered, setRegistered] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    
    const handleClose = () => {
        setOpen(false);
        toggleModal();
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setNewUser({ ...newUser, [e.target.name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://cinesatchel-com-backend.vercel.app/api/auth/register`, newUser);
            setRegistered(true);
            setOpen(true);
        } catch (err) {
            console.log(err);
            setOpen(true);
        }
    };

    //console.log(newUser);

    return (
        <div className="registerForm">
            <button 
            className="registerButton"
            onClick={toggleModal}
            >
                Register
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay">
                        <div className="modalContent">
                            <button className="closeModal" onClick={toggleModal}>X</button>
                            <h2 className="registerLabel">Register</h2>
                            <form className="registerFormInfo">
                                <label>Name</label>
                                <input type="text" name="username" onChange={handleChange}></input>
                                <label>Surname</label>
                                <input type="text" name="usersurname" onChange={handleChange}></input>
                                <label>Email</label>
                                <input type="email" name="email" onChange={handleChange}></input>
                                <label>Password</label>
                                <input type="password" name="password" onChange={handleChange}></input>
                                <label>Your Favorite Teacher?</label>
                                <input type="text" name="secanswer" onChange={handleChange}></input>
                            </form>
                            <div className="registerFromButtons">
                                <button className="registerFromButton" onClick={handleRegister}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
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
                {"Registration"}
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
                    {registered ? ("Registration is successful.") : ("Registration is failed.")}
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
                    color: 'green'
                    }}
                >Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}