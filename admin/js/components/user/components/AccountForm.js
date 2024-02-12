import React from "react";
import AccountFormFieldPassword from "./AccountFormFieldPassword";
import AccountFormFieldEmail from "./AccountFormFieldEmail";

export default function AccountForm({login, email, role, changePassword}){


    return (
        <div className="form">
            <div className="row">
                <div className="col-md-6 text-end">
                    <div className="field">Логин:</div>
                </div>
                <div className="col">{login}</div>
            </div>
            <AccountFormFieldEmail email={email} />
            <div className="row">
                <div className="col-md-6 text-end">
                    <div className="field">Роль:</div>
                </div>
                <div className="col">{role}</div>
            </div>

            <AccountFormFieldPassword changePassword={changePassword} />

        </div>
    );
}
