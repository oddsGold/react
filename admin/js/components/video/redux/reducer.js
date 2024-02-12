import {
    GET_VIDEO,
    VIDEO_COUNT,
    PER_PAGE,
    CURRENT_VIDEO,
    PAGE_NUMBER,
    PAGE_SIZE
} from "./types";

const initialState = {
    videoList: [],
    videoCount: 0,
    perPage: 0,
    pageNumber: 0,
    pageSize: 0,
    currentVideo: {}
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_VIDEO: {
            return {
                ...state,
                videoList: action.video
            }
        }
        case VIDEO_COUNT: {
            return {
                ...state,
                videoCount: action.count
            }
        }
        case PER_PAGE:
            return {
                ...state,
                perPage: Number(action.perPage)
            }
        case CURRENT_VIDEO:
            return {
                ...state,
                currentVideo: action.currentVideo
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
