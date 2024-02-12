import React, {useEffect, useRef, useState} from "react";
import ContentHeader from "../../layouts/components/ContentHeader";
import {Field, Formik, Form} from "formik";
import {formatISO9075, parse} from "date-fns";
// import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import CustomDatePicker from "./EditDataPicker";

function VideoForm(props) {

    let cDate = props.currentVideo.publish_at;

    const getDate = (date)=> {
        cDate = date;
    }

    return (
        <>
            <ContentHeader>
                {props.title}
            </ContentHeader>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    title: props.currentVideo.title ? props.currentVideo.title : "",
                    description: props.currentVideo.description ? props.currentVideo.description : "",
                    duration: props.currentVideo.duration ? props.currentVideo.duration : props.duration,
                    frame: props.currentVideo.frame ? props.currentVideo.frame : "",
                    publish_at: props.currentVideo.publish_at ? props.currentVideo.publish_at : "",
                }}
                onSubmit={
                    (values) => {
                        values.publish_at = cDate;
                        props.updateVideo(props.currentVideo.id, values);
                    }}
            >
                {({errors, touched, isValidating}) => (
                    <Form>
                        <label htmlFor="title" className="form-label">
                            <p>Title</p>
                            <Field id="title" className="form-control" name="title" placholder="Введіть назву відео"/>
                        </label>
                        <label htmlFor="description" className="form-label">
                            <p>Description</p>
                            <Field id="description" className="form-control" name="description"
                                   placholder="Введіть опис"/>
                        </label>
                        <label htmlFor="duration" className="form-label">
                            <p>Duration</p>
                            <Field id="duration" className="form-control" name="duration" placholder="Тривалість"/>
                        </label>
                        <label htmlFor="frame" className="form-label">
                            <p>Frame</p>
                            <Field id="frame" className="form-control" name="frame" placholder="Frame"/>
                        </label>

                        <label htmlFor="publish_at" className="form-label">
                            <p>Дата публикации</p>

                            <CustomDatePicker
                                publish_at={props.currentVideo.publish_at}
                                getDate={getDate}
                            />

                        </label>

                        <button type="submit" className="btn btn-primary">Зберегти</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default VideoForm;
