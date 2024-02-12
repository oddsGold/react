import React, {useRef} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import VideoCreateForm from "./VideoCreateForm";
import {createVideo} from "../redux/actions";

function VideoCreateContainer(props) {

    return(
        <VideoCreateForm
            createVideo={props.createVideo}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        currentVideo: state.layout.video.currentVideo
    }
}

export default compose(
    connect(null, {
        createVideo
    })
)(VideoCreateContainer);
