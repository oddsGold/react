import React from "react";

export default function AccountFormFieldEmail({email}){

    return (
        <div className="row">
            <div className="col-md-6 text-end">
                <div className="field">Email:</div>
            </div>
            <div className="col">{email}</div>
        </div>
    );
};
