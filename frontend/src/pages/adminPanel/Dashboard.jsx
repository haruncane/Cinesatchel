import SideBar from "../../components/sideBar/SideBar"
import InfoCard from "../../components/infoCard/InfoCard"
import "./dashboard.scss"
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [userCount, setUserCount] = useState();
    const [moviesCount, setMoviesCount] = useState();
    const [seriesCount, setSeriesCount] = useState();

    useEffect(() => {
        const getUserCount = async () => {
            try {
                const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/users/statistic`, {
                    headers: { 
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
                    }
                });
                //console.log(res.data[0])
                setUserCount(res.data[0].totalUsers);
            } catch (err) {
                console.log(err);
            }
        }
        const getMoviesCount = async () => {
            try {
                const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos/moviesStats`, {
                    headers: { 
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
                    }
                });
                //console.log(res.data[0])
                setMoviesCount(res.data[0].totalMovies);
            } catch (err) {
                console.log(err);
            }
        }
        const getSeriesCount = async () => {
            try {
                const res = await axios.get(`https://cinesatchel-com-backend.vercel.app/api/videos/seriesStats`, {
                    headers: { 
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken, 
                    }
                });
                //console.log(res.data[0])
                setSeriesCount(res.data[0].totalSeries);
            } catch (err) {
                console.log(err);
            }
        }
        getUserCount();
        getMoviesCount();
        getSeriesCount();
    });

    return (
    <div className="dashboard">
        <div className="left">
            <SideBar />
        </div>
        <div className="right">
            <InfoCard midInfo="9999" botInfo="Views" />
            <InfoCard midInfo={userCount} botInfo="Users" />
            <InfoCard midInfo={moviesCount} botInfo="Movies" />
            <InfoCard midInfo={seriesCount} botInfo="Series" />
        </div>
    </div>
  )
}

export default Dashboard;