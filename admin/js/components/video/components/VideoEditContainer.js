import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {getCurrentVideo} from "../redux/actions";
import VideoEditForm from "./VideoEditForm";

function VideoEditContainer(props) {

    const [videoId, setVideoId] = useState(props.match.params.videoId);

    useEffect(() => {
        props.getCurrentVideo(videoId);
    }, [props.match.params])

    return (
        <>
            <VideoEditForm
                currentVideo={props.currentVideo}
            />
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        currentVideo: state.layout.video.currentVideo
    }
}

export default compose(
    connect(mapStateToProps, {
        getCurrentVideo
    }),
    withRouter
)(VideoEditContainer);
