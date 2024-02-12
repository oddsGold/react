import {
    INSTANCE
} from "./types";


export const video = {

    getVideo() {
        return INSTANCE.get(`/video`)
            .then(response => {
                return response.data
            })
    }

};
