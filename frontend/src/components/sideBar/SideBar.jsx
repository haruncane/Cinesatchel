import "./sideBar.scss";
import mainLogo from "../../utils/mainLogo.png"
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const navigateToAdminPanel = () => {
    navigate('/dashboard');
  }
  const navigateToVideos = () => {
    navigate('/videoList');
  }
  const navigateToAddVideo = () => {
    navigate('/addVideo');
  }
  const navigateToHome = () => {
    navigate('/');
  }
  
  return (
    <div className="sideBar">
        <div className="logo">
            <img 
                className="logo"
                src={mainLogo}
                alt=""
            />
        </div>
        <hr />
        <div className="buttons">
            <button className="dashboardBtn" onClick={navigateToAdminPanel}>Dashboard</button>
            <button className="dashboardBtn" onClick={navigateToVideos}>Videos</button>
            <button className="dashboardBtn" onClick={navigateToAddVideo}>Add Video</button>
            <button className="dashboardBtn" onClick={navigateToHome}>Homepage</button>
        </div>
    </div>
  )
}

export default SideBar;