import {
    GET_SUBSCRIBES,
    SUBSCRIBES_COUNT,
    PAGE_NUMBER,
    PAGE_SIZE,
    PER_PAGE
} from "./types";
import {startFetching, stopFetching} from "../../settings/redux/actions";
import API from "../../../utils/API";
import {Notification} from "../../../../../site/js/utils/Notification";

export const saveSubscribesList = (subscribes) => {
    return {
        type: GET_SUBSCRIBES,
        subscribes: subscribes
    }
}

export const subscribesCount = (count) => {
    return {
        type: SUBSCRIBES_COUNT,
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

export const getSubscribes= () => {

    return async (dispatch, getState) => {
        dispatch(startFetching());

        const {pageNumber, pageSize} = getState().layout.subscribe;

        try {
            let data = await API.getSubscribes(pageNumber, pageSize);

            dispatch(saveSubscribesList(data.data));
            dispatch(subscribesCount(data.total));
            dispatch(perPage(data.per_page));
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

export const savePageAndGetSubscribes = (pageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(savePageNumber(pageNumber));
        dispatch(savePageSize(pageSize));
        dispatch(getSubscribes());

    }
}

export const deleteSubscribes = (id) => {
    return async (dispatch) => {
        dispatch(startFetching());

        try {
            let response = await API.deleteSubscribes(id);
            dispatch(getSubscribes());
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

export const exportToExcel = () => {
    return async (dispatch) => {
        try{
            const response = await API.getExcelOrders();
            if(response && response.data){
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(
                    new Blob([response.data], { type: "application/octet-stream" })
                );
                link.download = "export.xlsx";
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }
        }catch (e){
        }
    };
};




