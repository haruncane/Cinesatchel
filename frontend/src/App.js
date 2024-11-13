import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import "./index.scss"
import Home from "./pages/home/Home";
import Welcome from "./pages/welcome/Welcome";
import Dashboard from "./pages/adminPanel/Dashboard";
import VideoList from "./pages/adminPanel/VideoList";
import AddVideo from "./pages/adminPanel/AddVideo";
import UpdateVideo from "./pages/adminPanel/UpdateVideo";
import MyLists from "./pages/myLists/MyLists";
import Player from "./pages/player/Player";
import AccountDetails from "./pages/accountDetails/AccountDetails";
import Profiles from "./pages/profiles/Profiles";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

export function App() {
  const { user } = useContext(AuthContext);
  let checkAdmin = false;

  if (user) {
    checkAdmin = user.isAdmin;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Welcome /> : <Navigate to="/" />} />
        <Route path="/profiles" element={user ? <Profiles /> : <Navigate to="/login" />} />
        <Route path="/movies" element={user ? <Home format="Movie" /> : <Navigate to="/login" />} />
        <Route path="/series" element={user ? <Home format="Series" /> : <Navigate to="/login" />} />
        <Route path="/myLists" element={user ? <MyLists /> : <Navigate to="/login" />} />
        <Route path="/accountDetails" element={user ? <AccountDetails /> : <Navigate to="/login" />} />
        <Route path="/player" element={user ? <Player /> : <Navigate to="/login" />} />
        {checkAdmin && (
          <>    
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/videoList" element={<VideoList />} />
            <Route path="/addVideo" element={<AddVideo />} />
            <Route path="/updateVideo" element={<UpdateVideo />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App;