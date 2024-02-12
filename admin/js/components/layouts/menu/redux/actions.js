import {FETCH_SIDEBAR_MENU} from "./types";
import {startFetching, stopFetching} from "../../../settings/redux/actions";
import API from "../../../../utils/API";

export const fetchMenu = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            const response = await API.getSidebarMenus();
            if(response && response.data && response.data.data && response.status === 200){
                dispatch({type: FETCH_SIDEBAR_MENU, payload: response.data.data})
            }
        } catch (e) {

        }
        dispatch(stopFetching());
    }
};
