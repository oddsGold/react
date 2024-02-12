import React, {useEffect, useState} from "react";
import ContentHeader from "../../layouts/components/ContentHeader";
import {Field, Formik, Form} from "formik";
import CustomDatePicker from "./CreateDataPicker";
import InputDuration from "./InputDuration";
import {required} from "../../../utils/validation";

function VideoCreateForm (props) {

    let cDuration = "";
    let cDate = "";

    const getDate = (date)=> {
        cDate = date;
    }

    const getDuration = (duration)=> {
        cDuration = duration;
    }

    return (
        <div className="video-create-form">
            <ContentHeader>
                Video create form
            </ContentHeader>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    title: "",
                    description: "",
                    duration: cDuration ? cDuration : "",
                    frame: "",
                    publish_at: new Date(),
                }}
                onSubmit={
                    (values,{resetForm}) => {
                        values.publish_at = cDate;
                        values.duration = cDuration;
                        props.createVideo(values);
                        resetForm({values: ''});
                    }}
            >

                {({errors, touched, isValidating, values }) => (
                    <Form>
                        <label htmlFor="title" className="form-label">
                            <p>Title</p>
                            <Field id="title" validate={required} className="form-control" name="title" placholder="Введіть назву відео"/>
                            {errors.title && touched.title && <div className="video-errors">{errors.title}</div>}
                        </label>
                        <label htmlFor="description" className="form-label">
                            <p>Description</p>
                            <Field  id="description" className="form-control" name="description"
                                   placholder="Введіть опис"/>
                            {/*{errors.description && touched.description && <div className="video-errors">{errors.description}</div>}*/}
                        </label>

                        <InputDuration getDuration={getDuration} />

                        <label htmlFor="frame" className="form-label">
                            <p>Frame</p>
                            <Field id="frame" validate={required} className="form-control" name="frame" placholder="Frame"/>
                            {errors.frame && touched.frame && <div className="video-errors">{errors.frame}</div>}
                        </label>

                        <label htmlFor="publish_at" className="form-label">
                            <p>Дата публикации</p>

                            <CustomDatePicker
                                getDate={getDate}
                            />

                        </label>

                        <button type="submit" className="btn btn-primary">Зберегти</button>
                    </Form>
                )}

            </Formik>

        </div>
    )
}

export default VideoCreateForm;
