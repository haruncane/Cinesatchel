import "./infoCard.scss";
import logo from "../../utils/logo/logo.png"

const InfoCard = (props) => {
    return (
    <div className="infoCard">
        <div className="top">
            <img 
                className="miniLogo"
                src={logo}
                alt=""
            />
        </div>
        <div className="mid">
            <h1>{props.midInfo}</h1>
        </div>
        <div className="bot">
            <h3>{props.botInfo}</h3>
        </div>
    </div>
  )
}

export default InfoCard;