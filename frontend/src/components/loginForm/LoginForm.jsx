import { useContext, useState } from "react";
import "./loginForm.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LoginForm() {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [changePassword, setchangePassword] = useState(false);
    const [uptUser, setUptUser] = useState({});
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const toggleModal = () => {
        setModal(!modal);
        setchangePassword(false);
    }

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleModal = (e) => {
        setchangePassword(true);
    }

    const handleClose = () => {
        setOpen(false);
        setchangePassword(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setUptUser({ ...uptUser, [e.target.name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://cinesatchel-com-backend.vercel.app/api/users/changePassword`, uptUser);
            setUpdated(true);
            setOpen(true);
        } catch (err) {
            console.log(err);
            setOpen(true);
        }
    }

    return (
    <div className="loginForm">
        <button 
            className="loginButton"
            onClick={toggleModal}
        >
            Login
        </button>
        {modal && (
            <div className="modal">
                <div className="overlay">
                    <div className="modalContent">
                        <button className="closeModal" onClick={toggleModal}>X</button>
                        {changePassword ? (
                            <>
                                <h2 className="loginLabel">Change Password</h2>
                                <form className="loginFormInfo">
                                    <label>Who was your favorite teacher?</label>
                                    <input type="text" name="secanswer" onChange={handleChange}></input>
                                    <label>Email</label>
                                    <input type="email" name="email" onChange={handleChange}></input>
                                    <label>New Password</label>
                                    <input type="password" name="password" onChange={handleChange}></input>
                                </form>
                                <div className="loginFromButtons">
                                    <button className="loginFromButton" onClick={handleSubmit}>Change Password</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="loginLabel">Login</h2>
                                <form className="loginFormInfo">
                                    <label>Email</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
                                    <label>Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                                </form>
                                <div className="loginFromButtons">
                                    <button className="loginFromButton" onClick={handleModal}>Forget Password</button>
                                    <button className="loginFromButton" onClick={handleLogin}>Login</button>
                                </div>
                            </>
                        )}
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
            {"Change Password"}
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
                {updated ? ("Changing password is successful.") : ("Changing password is failed.")}
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

