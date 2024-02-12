import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {deleteVideo, savePageAndGetVideo} from "../redux/actions";
import VideoPage from "./VideoPage";

function VideoContainer(props) {

    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        props.savePageAndGetVideo(activePage, pageSize);
    },[])

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        props.savePageAndGetVideo(pageNumber, pageSize);
    }

    return (
        <VideoPage
            activePage={activePage}
            totalItemsCount={props.videoCount}
            perPage={props.perPage}
            handlePageChange={handlePageChange}
            videoList={props.videoList}
            deleteVideo={props.deleteVideo}
        />
    )
}


let mapStateToProps = (state) => {
    return {
        videoList: state.layout.video.videoList,
        videoCount: state.layout.video.videoCount,
        perPage: state.layout.video.perPage,
    }
}

export default compose(
    connect(mapStateToProps,
        {
            savePageAndGetVideo,
            deleteVideo
        })
)(VideoContainer);
