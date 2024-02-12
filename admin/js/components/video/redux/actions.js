import {
    GET_VIDEO,
    VIDEO_COUNT,
    PER_PAGE,
    CURRENT_VIDEO,
    PAGE_NUMBER,
    PAGE_SIZE
} from "./types";
import {startFetching, stopFetching} from "../../settings/redux/actions";
import API from "../../../utils/API";
import {Notification} from "../../../../../site/js/utils/Notification";

export const saveVideoList = (video) => {
    return {
        type: GET_VIDEO,
        video: video
    }
}

export const videoCount = (count) => {
    return {
        type: VIDEO_COUNT,
        count: count
    }
}

export const perPage = (perPage) => {
    return {
        type: PER_PAGE,
        perPage: perPage
    }
}

export const savePageNumber = (pageNumber) => {
    return {
        type: PAGE_NUMBER,
        pageNumber: pageNumber
    }
}
export const savePageSize = (pageSize) => {
    return {
        type: PAGE_SIZE,
        pageSize: pageSize
    }
}

export const currentVideo = (currentVideo) => {
    return {
        type: CURRENT_VIDEO,
        currentVideo: currentVideo
    }
}

export const getVideo = () => {
    return async (dispatch, getState) => {
        dispatch(startFetching());

        const {pageNumber, pageSize} = getState().layout.video;
        let data = await API.getVideo(pageNumber, pageSize);

        dispatch(saveVideoList(data.data));
        dispatch(videoCount(data.total));
        dispatch(perPage(data.per_page));

        dispatch(stopFetching());
    }
}

export const savePageAndGetVideo = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(savePageNumber(pageNumber));
        dispatch(savePageSize(pageSize));
        dispatch(getVideo());

    }
}

export const getCurrentVideo = (id) => {
    return async (dispatch) => {
        dispatch(startFetching());

        let data = await API.getCurrentVideo(id);
        dispatch(currentVideo(data))

        dispatch(stopFetching());
    }
}

export const updateVideo = (id, data) => {

    return async (dispatch) => {
        dispatch(startFetching());
        try {
            let response = await API.updateVideo(id, data);
            dispatch(currentVideo(response));
            Notification.success(null, 'Success');
        }catch (e) {
            if(e.response && e.response.status === 422 && e.response.data && e.response.data.errors) {
                const errors = e.response.data.errors;
                for(let i in errors){
                    Notification.error(null, errors[i][0]);
                }
            }
        }
        dispatch(stopFetching());
    }
}

export const createVideo = (data) => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            let response = await API.createVideo(data);
            Notification.success(null, 'Success');
        }catch (e) {
            if(e.response && e.response.status === 422 && e.response.data && e.response.data.errors) {
                const errors = e.response.data.errors;
                for(let i in errors){
                    Notification.error(null, errors[i][0]);
                }
            }
        }
        dispatch(stopFetching());
    }
}

export const deleteVideo = (id) => {
    return async (dispatch) => {
        dispatch(startFetching());

        try {
            let response = await API.deleteVideo(id);
            dispatch(getVideo());
            Notification.success(null, 'Success');
        }catch (e) {
            if(e.response && e.response.status === 422 && e.response.data && e.response.data.errors) {
                const errors = e.response.data.errors;
                for(let i in errors){
                    Notification.error(null, errors[i][0]);
                }
            }
        }
        dispatch(stopFetching());
    }
}
