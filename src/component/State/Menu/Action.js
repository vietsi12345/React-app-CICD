
import { api } from "../../Config/api";
import { GET_ALL_CART_ITEMS_CART_FAILURE } from "../Cart/ActionType";
import {
    CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_ALL_DRINK_OF_RESTAURANT_REQUEST,
    GET_ALL_DRINK_OF_RESTAURANT_SUCCESS,
    GET_DRINK_NOT_PROMOTION_FAILURE,
    GET_DRINK_NOT_PROMOTION_REQUEST,
    GET_DRINK_NOT_PROMOTION_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_DISCOUNT_DRINK_FAILURE,
    UPDATE_DISCOUNT_DRINK_REQUEST,
    UPDATE_DISCOUNT_DRINK_SUCCESS,
    UPDATE_MENU_ITEM_AVALIABLE_FAILURE,
    UPDATE_MENU_ITEM_AVALIABLE_REQUEST,
    UPDATE_MENU_ITEM_AVALIABLE_SUCCESS

} from "./ActionType"

export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post('api/admin/drink', menu,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('createMenuItem: ', data);
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi createMenuItem ", error);
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
        }
    }
}

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/drink/promotion/restaurant/${reqData.restaurantId}?vagetarian=${reqData.vagetarian}
            &nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&drinkCategory=${reqData.drinkCategory}`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }
            )
            console.log('getMenuItemsByRestaurantId: ', data);
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi getMenuItemsByRestaurantId ", error);
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        }
    }
}

export const searchMenuItem = ({ keyword, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.get(`api/drink/search?name=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('searchMenuItem: ', data);
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi searchMenuItem ", error);
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
        }
    }
}

// export const getAllIngredientOfMenuItem = ({ reqData }) => {
//     return async (dispatch) => {
//         dispatch({ type: GET });
//         try {
//             const { data } = await api.post('api/admin/drink', menu,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${jwt}`
//                     }
//                 }
//             )
//             console.log('createMenuItem: ', data);
//             dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
//         } catch (error) {
//             console.log("Lỗi createMenuItem ", error);
//             dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
//         }
//     }
// }

export const updateMenuItemsAvaliable = ({ drinkId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEM_AVALIABLE_REQUEST });
        try {
            const { data } = await api.put(`/api/admin/drink/${drinkId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('updateMenuItemsAvaliable: ', data);
            dispatch({ type: UPDATE_MENU_ITEM_AVALIABLE_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi updateMenuItemsAvaliable ", error);
            dispatch({ type: UPDATE_MENU_ITEM_AVALIABLE_FAILURE, payload: error });
        }
    }
}

// hiển thị thêm khuyến mãi vào despcription
export const getAllDrinkRestaurant = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_DRINK_OF_RESTAURANT_REQUEST });
        try {
            // const { data } = await api.get(`/api/drink/restaurants/${restaurantId}`,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${jwt}`
            //         }
            //     }
            // )
            const { data } = await api.get(`/api/admin/promotion/drink/restaurant`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('getAllDrinkRestaurant: ', data);
            dispatch({ type: GET_ALL_DRINK_OF_RESTAURANT_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi getAllDrinkRestaurant ", error);
            dispatch({ type: GET_ALL_CART_ITEMS_CART_FAILURE, payload: error });
        }
    }
}

export const getDrinksNotPromotion = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_DRINK_NOT_PROMOTION_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/drink/restaurant/not-promotion`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('getDrinksNotPromotion: ', data);
            dispatch({ type: GET_DRINK_NOT_PROMOTION_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi getDrinksNotPromotion ", error);
            dispatch({ type: GET_DRINK_NOT_PROMOTION_FAILURE, payload: error });
        }
    }
}

export const updateDiscountDrink = ({ jwt, drinkId, discount }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_DISCOUNT_DRINK_REQUEST });
        try {
            const formData = new FormData();
            formData.append('percent', discount); // Thêm cặp key-value

            const { data } = await api.put(
                `/api/admin/discount/drink/${drinkId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        'Content-Type': 'multipart/form-data' // Đặt kiểu dữ liệu là form-data
                    }
                }
            )
            console.log('updateDiscountDrink: ', data);
            dispatch({ type: UPDATE_DISCOUNT_DRINK_SUCCESS, payload: data });
        } catch (error) {
            console.log("Lỗi updateDiscountDrink ", error);
            dispatch({ type: UPDATE_DISCOUNT_DRINK_FAILURE, payload: error });
        }
    }
}


export const deleteFoodAction = ({ drinkId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.delete(`/api/admin/drink/${drinkId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('deleteFoodAction: ', data);
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: drinkId });
        } catch (error) {
            console.log("Lỗi deleteFoodAction ", error);
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
        }
    }
}

