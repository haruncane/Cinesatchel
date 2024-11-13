import "./navbar.scss"
import logo from "../../utils/logo.png"
import { useContext, useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";
import axios from "axios";

const Navbar = ({ format, setCategory, setTerm, page }) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState({});
 
    window.onscroll = () => {
        setIsScrolled(window.ScrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    
    const navigateToHome = () => {
        navigate('/')
    }
    const navigateToMovies = () => {
        navigate('/movies')
    }
    const navigateToSeries = () => {
        navigate('/series')
    }
    const navigateToMyLists = () => {
        navigate('/myLists')
    }
    const navigateToAccountDetails = () => {
        navigate('/accountDetails')
    }
    const navigateToProfiles = () => {
        navigate('/profiles')
    }
    const navigateToAdminPanel = () => {
        navigate('/dashboard')
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://cinesatchel-com-backend.vercel.app/api/users/${JSON.parse(localStorage.getItem("user"))._id}/profiles`, { selectedprofile: null }, {
              headers: { 
                token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
              }
            });
            dispatch(logout());
        } catch (err) {
            console.log(err);
        }
    };

    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")).selectedprofile !== null) {
            const getProfile = async () => {
            try {
                const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/users/find/${JSON.parse(localStorage.getItem("user"))._id}/profiles/find/` + JSON.parse(localStorage.getItem("user")).selectedprofile, {
                headers: { 
                    token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
                }
                });
                //console.log(profile)
                setProfile(res.data);
            } catch (err) {
                console.log(err);
            }
            };
            getProfile();
        }
    }, [user]);
    
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="left">
            <img
                src={logo}
                alt=""
            />
            <span onClick={navigateToHome}>Homepage</span>
            <span onClick={navigateToMovies}>Movies</span>
            <span onClick={navigateToSeries}>Series</span>
            <span onClick={navigateToMyLists}>My Lists</span>
        </div>
        <div className="right">
            {format && (
                <select 
                    name="category"
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>Category</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Animation">Animation</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Drama">Drama</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci_Fi">Sci-Fi</option>
                    <option value="Thriller">Thriller</option>
                </select>
            )}
            {user.isAdmin && !format && (
                <button className="adminPanelButton" onClick={navigateToAdminPanel}>Admin Panel</button>
            )}
            {page === "home" && !format && (
                <SearchBar setTerm={setTerm} />
            )}
            <div className="account">
                {user.isAdmin ? (
                    <span>Admin</span>
                ) : (
                    <span>{profile.profilename}</span>
                )}
                <div className="options">
                    <span onClick={navigateToAccountDetails}>Account Details</span>
                    <span onClick={navigateToProfiles}>Profiles</span>
                    <span onClick={handleLogout}>Logout</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;