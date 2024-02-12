import {combineReducers} from "redux";
import userReducer from "../components/user/redux/reducer";
import settingsReducer from "../components/settings/redux/reducer";
import menuReducer from "../components/layouts/menu/redux/reducer";
import dashboardReducer from "../components/layouts/dashboard/redux/reducer";
import videoReducer from "../components/video/redux/reducer";
import subscribeReducer from "../components/subscribes/redux/reducer";

export default combineReducers({
    user: userReducer,
    settings: settingsReducer,
    layout: combineReducers({
        menu: menuReducer,
        dashboard: dashboardReducer,
        video: videoReducer,
        subscribe: subscribeReducer
    }),
});
