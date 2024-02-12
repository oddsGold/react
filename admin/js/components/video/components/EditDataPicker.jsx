import React, {useEffect, useState} from "react";
import {formatISO9075, parse} from "date-fns";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";

function CustomDatePicker(props) {

    const [date,setDate] = useState('');

    useEffect(() => {
        if(props.publish_at){
            let pd = parse(props.publish_at, 'yyyy-MM-dd HH:mm:ss', new Date());
            if(pd instanceof Date){
                if(date === ''){
                    return setDate(pd);
                }
            }
        }

    },[props.publish_at])

    useEffect(() => {
        props.getDate((date instanceof Date) ? formatISO9075(date) : date);
    },[date])

    return(
        <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            isClearable
            locale={ru}
            wrapperClassName="w-100 custom-date-picker"
            timeFormat="HH:mm"
            className="form-control"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="dd.MM.yyyy HH:mm"
        />
    )
}

export default CustomDatePicker;
