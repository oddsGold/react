import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ReactNotification from "react-notifications-component";
import {compose} from "redux";
import {parse} from "date-fns";
import {updateVideo} from "../redux/actions";
import VideoForm from "./VideoForm";



function VideoEditForm(props) {

    const [duration, setDuration] = useState( 0);

    const [date,setDate] = useState('');

    useEffect(() => {
        if(props.currentVideo.publish_at){
            let pd = parse(props.currentVideo.publish_at, 'yyyy-MM-dd HH:mm:ss', new Date());
            if(pd instanceof Date){
                if(date === ''){
                    return setDate(pd);
                }
            }
        }

    },[props.currentVideo.publish_at])

    return(
        <div className="video-edit-form">

            <VideoForm
                currentVideo={props.currentVideo}
                duration={duration}
                title="Video edit form"
                updateVideo={props.updateVideo}
            />

        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        fetching: state.settings.fetching
    }
}

export default compose(
    connect(mapStateToProps,
        {
            updateVideo
        })
)(VideoEditForm);
