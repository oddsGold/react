import {START_FETCHING, STOP_FETCHING} from "./types";

const initialState = {
    fetching: false
};

export default (state = initialState, {type, payload}) => {

    switch (type) {

        case START_FETCHING:
            return {...state, fetching: true};

        case STOP_FETCHING:
            return {...state, fetching: false};

        default: return state;
    }
};
