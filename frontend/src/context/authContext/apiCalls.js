import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./AuthActions";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`https://cinesatchel-com-backend.vercel.app/api/auth/login`, user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};