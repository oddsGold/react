import React from "react";
import {NavLink} from "react-router-dom";
import ContentHeader from "../../layouts/components/ContentHeader";

function VideoList(props) {
    return (

        <>

            <ContentHeader>
                Video
            </ContentHeader>

            <div className="video-add">
                <NavLink to={'/admin/video/create'} type="button" className="btn btn-primary">Add Video</NavLink>
            </div>

            <div className="video-list">
                <div className="video-list-table">
                    <div className="video-list-table-header">
                        <div className="row">
                            <div className="col-lg-1">
                                <p>ID</p>
                            </div>
                            <div className="col-lg-3">
                                <p>Title</p>
                            </div>
                            <div className="col-lg-7">
                                <p>Description</p>
                            </div>
                        </div>
                    </div>
                    <div className="video-list-table-body">
                        {
                            props.videoList.map((video, index) => {
                                return (
                                    <div className="video-list-table-body-row" key={video.id}>
                                        <div className="row">
                                            <div className="col-lg-1">
                                                <NavLink to={'/admin/video/'+video.id+'/edit'}>{video.id}</NavLink>
                                            </div>
                                            <div className="col-lg-3">
                                                <p>
                                                    {video.title}
                                                </p>
                                            </div>
                                            <div className="col-lg-6">
                                                <p>
                                                    {video.description}
                                                </p>
                                            </div>
                                            <div className="col-lg-1 text-end">
                                                <NavLink to={'/admin/video/'+video.id+'/edit'}>
                                                    <button type="button" className="btn btn-primary">
                                                        Edit
                                                    </button>
                                                </NavLink>
                                            </div>
                                            <div className="col-lg-1 text-end">
                                                <button type="button" className="btn btn-danger" onClick={() => {props.deleteVideo(video.id)}}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default VideoList;
