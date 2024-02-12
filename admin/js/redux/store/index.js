import storeDev from "./dev";
import storeProd from "./prod";

export default (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
        storeDev : storeProd;
