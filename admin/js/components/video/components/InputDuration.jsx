import React, {useEffect, useState} from "react";
import {Field} from "formik";

function InputDuration(props) {
    const [duration, setDuration] = useState( 0);

    const getValues = (values) => {
        setDuration(parseInt(values));
        if(Number.isNaN(duration)) {
            setDuration(0);
        }
    };

    useEffect(()=> {
        props.getDuration(duration);
    },[duration])

    return(
        <label htmlFor="duration" className="form-label">
            <p>Duration</p>
            <Field onChange={
                e => {
                    getValues(e.target.value);
                }
            } id="duration" className="form-control" name="duration" value={duration} placholder="Тривалість"/>
        </label>
    )
}

export default InputDuration;
