import {
    GET_SUBSCRIBES,
    SUBSCRIBES_COUNT,
    PAGE_NUMBER,
    PAGE_SIZE,
    PER_PAGE
} from "./types";

const initialState = {
    subscribeList:[],
    subscribesCount: 0,
    perPage: 0,
    pageNumber: 0,
    pageSize: 0,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_SUBSCRIBES: {
            return {
                ...state,
                subscribeList: action.subscribes
            }
        }
        case SUBSCRIBES_COUNT: {
            return {
                ...state,
                subscribesCount: action.count
            }
        }
        case PER_PAGE:
            return {
                ...state,
                perPage: Number(action.perPage)
            }
        case PAGE_NUMBER:{
            return {
                ...state,
                pageNumber:action.pageNumber
            }
        }
        case PAGE_SIZE: {
            return {
                ...state,
                pageSize:action.pageSize
            }
        }
        default:
            return state;
    }

}
