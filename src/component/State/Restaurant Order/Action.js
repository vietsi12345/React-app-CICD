import { api } from "../../Config/api";
import { GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
        try {
            const { data } = await api.put(`/api/admin/order/${orderId}/${orderStatus}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('updateOrderStatus: ', data);
            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi updateOrderStatus ", error);
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
        }
    }
}

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`,
                {
                    params: { order_status: orderStatus },
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('fetchRestaurantsOrder: ', data);
            dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi fetchRestaurantsOrder ", error);
            dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error });
        }
    }
}