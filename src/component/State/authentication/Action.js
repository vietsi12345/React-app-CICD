import axios from "axios";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCES, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCES, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCES, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCES } from "./ActionType";
import { API_URL, api } from "../../Config/api";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        console.log(reqData.userData)
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate('/admin/restaurant')
        }
        else {
            reqData.navigate('/')
        }
        dispatch({ type: REGISTER_SUCCES, payload: data.jwt })
        console.log('register success', data)

    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error })
        console.log("lỗi đăng ký: ", error)
    }
};

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate('/admin/restaurant')
        }
        else {
            reqData.navigate('/')
        }
        dispatch({ type: LOGIN_SUCCES, payload: data.jwt })

        console.log('login success', data)

    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error })
        console.log("lỗi đăng nhập: ", error)
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: GET_USER_SUCCES, payload: data })
        console.log('user profile', data)

    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error })
        console.log("lỗi lấy user theo jwt: ", error)
    }
};

export const addToFavorite = ({ jwt, restaurant_id }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST })
    try {
        const { data } = await api.put(`/api/restaurants/${restaurant_id}/add-favorites`, {}, {

            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: ADD_TO_FAVORITE_SUCCES, payload: data })
        console.log('added to favorite', data)

    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error })
        console.log("lỗi danh sách nhà hàng thêm nhà hàng yêu thích: ", error)
    }
};

export const logOut = () => async (dispatch) => {
    try {
        localStorage.clear()

        dispatch({ type: LOGOUT })
        console.log('logout success')

    } catch (error) {
        console.log("lỗi đăng xuất: ", error)
    }
};

//abc