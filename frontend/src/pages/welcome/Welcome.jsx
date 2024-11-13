import "./welcome.scss";
import mainLogo from "../../utils/mainLogo.png";
import LoginForm from "../../components/loginForm/LoginForm";
import RegisterForm from "../../components/registerForm/RegisterForm";

const Welcome = () => {
    return (
    <div className='welcome'>
        <div className="top">
            <img
                className='logo'
                src={mainLogo}
                alt=""
            />
            <div className="buttons">
                <LoginForm />
                <RegisterForm />
            </div>
        </div>
        <div className="mid">
            <h1>
                Ready to watch? Create or restart your membership.
            </h1>
        </div>
    </div>
  )
}

export default Welcome;