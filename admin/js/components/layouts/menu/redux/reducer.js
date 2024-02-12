import {FETCH_SIDEBAR_MENU} from "./types";

const initialState = {
    data: null
};

export default (state = initialState, {type, payload}) => {

    switch (type) {

        case FETCH_SIDEBAR_MENU:
            return { ...state, data: payload};

        default: return state;
    }
};
