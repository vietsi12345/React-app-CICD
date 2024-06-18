
import { api } from "../../Config/api";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEARE_CART_FAILURE, CLEARE_CART_REQUEST, CLEARE_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_CART_FAILURE, GET_ALL_CART_ITEMS_CART_REQUEST, GET_ALL_CART_ITEMS_CART_SUCCESS, REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS, UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS } from "./ActionType";

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const response = await api.get(`/api/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log('findCart: ', response.data);
            dispatch({ type: FIND_CART_SUCCESS, payload: response.data });

        } catch (error) {
            console.log("Lỗi findCart ", error);
            dispatch({ type: FIND_CART_FAILURE, payload: error });
        }
    }
}

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_CART_REQUEST });
        try {
            const response = await api.get(`/api/carts/${reqData.cartId}/items`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.token}`
                    }
                }
            )
            console.log('getAllCartItems: ', response.data);
            dispatch({ type: GET_ALL_CART_ITEMS_CART_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Lỗi getAllCartItems ", error);
            dispatch({ type: GET_ALL_CART_ITEMS_CART_FAILURE, payload: error });
        }
    }
}

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const response = await api.put(`/api/cart/add`, reqData.cartItem,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.token}`
                    }
                }
            )
            console.log('addItemToCart: ', response.data);
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Lỗi addItemToCart ", error);
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
        }
    }
}

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });
        try {
            const { data } = await api.put(`/api/cart-item/update`, reqData.data,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }
            )
            console.log('updateCartItem: ', data);
            dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi updateCartItem ", error);
            dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error });
        }
    }
}

export const removeCartItem = ({ cartItemId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CARTITEM_REQUEST });
        try {
            const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('removeCartItem: ', data);
            dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
        } catch (error) {
            console.log("Lỗi removeCartItem ", error);
            dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error });
        }
    }
}

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({ type: CLEARE_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/clear`, {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            console.log('clearCartAction: ', data);
            dispatch({ type: CLEARE_CART_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi clearCartAction ", error);
            dispatch({ type: CLEARE_CART_FAILURE, payload: error });
        }
    }
}