import { api } from '../../Config/api'
import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from "./ActionType";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('getIngredientsOfRestaurant: ', response.data);
            dispatch({ type: GET_INGREDIENT, payload: response.data });
        } catch (error) {
            console.log("Lỗi getIngredientsOfRestaurant ", error);
        }
    }
}

export const createIngredient = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(`/api/admin/ingredients`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('createIngredient: ', response.data);
            dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Lỗi createIngredient ", error);
        }
    }
}

export const createIngredientCategory = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(`/api/admin/ingredients/category`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('createIngredientCategory: ', response.data);
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Lỗi createIngredientCategory ", error);
        }
    }
}

export const getIngredientsCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('getIngredientsCategory: ', response.data);
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Lỗi getIngredientsCategory ", error);
        }
    }
}

export const updateStockIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`/api/admin/ingredients/${id}/stoke`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('updateStockIngredient: ', response.data);
            dispatch({ type: UPDATE_STOCK, payload: response.data });
        } catch (error) {
            console.log("Lỗi updateStockIngredient ", error);
        }
    }
}