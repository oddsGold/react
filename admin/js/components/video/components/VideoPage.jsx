import React from "react";
import Pagination from "react-js-pagination";
import VideoList from "./VideoList";

function VideoPage(props) {
    return (
        <div className="video-page">
            <VideoList
                videoList={props.videoList}
                deleteVideo={props.deleteVideo}
            />


            {props.totalItemsCount
                ? <Pagination
                    activePage={props.activePage}
                    itemsCountPerPage={props.perPage}
                    totalItemsCount={props.totalItemsCount}
                    onChange={props.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                : ""
            }
        </div>
    )
}

export default VideoPage;
