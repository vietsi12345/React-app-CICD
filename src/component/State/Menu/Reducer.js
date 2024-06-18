import * as actionTypes from './ActionType'

const initialState = {
    menuItems: [],
    allDrinks: [],
    loading: false,
    error: null,
    search: [],
    message: null,
    drinksNotPromotion: []
}

const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENU_ITEM_AVALIABLE_REQUEST:
        case actionTypes.GET_ALL_DRINK_OF_RESTAURANT_REQUEST:
        case actionTypes.UPDATE_DISCOUNT_DRINK_REQUEST:
        case actionTypes.GET_DRINK_NOT_PROMOTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }
        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                message: 'Tạo đồ uống mới thành công'
            }
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
            }
        case actionTypes.GET_DRINK_NOT_PROMOTION_SUCCESS:
            return {
                ...state,
                loading: false,
                drinksNotPromotion: action.payload,
            }
        case actionTypes.GET_ALL_DRINK_OF_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                allDrinks: action.payload,
            }
        case actionTypes.UPDATE_DISCOUNT_DRINK_SUCCESS:
            return {
                ...state,
                loading: false,
                allDrinks: state.allDrinks.map(
                    (drink) => drink.id === action.payload.id ?
                        action.payload : drink   // đang đợi thành sửa
                ),
            }
        case actionTypes.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(
                    (menuItem) => menuItem.id !== action.payload
                ),
                allDrinks: state.allDrinks.filter(
                    (drink) => drink.id !== action.payload
                ),
            }
        case actionTypes.UPDATE_MENU_ITEM_AVALIABLE_SUCCESS:
            console.log("updated items id ", action.payload.id)
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(
                    (menuItem) => menuItem.id === action.payload.id ?
                        action.payload : menuItem
                ),
                allDrinks: state.allDrinks.map(
                    (drink) => drink.id === action.payload.id ?
                        action.payload : drink
                ),
            }
        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload,
            }
        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEM_AVALIABLE_FAILURE:
        case actionTypes.GET_ALL_DRINK_OF_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_DISCOUNT_DRINK_FAILURE:
        case actionTypes.GET_DRINK_NOT_PROMOTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            }
        default:
            return initialState;
    }
}

export default menuItemReducer;