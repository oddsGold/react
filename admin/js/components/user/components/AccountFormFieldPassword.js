import React from "react";
import {connect} from "react-redux";
import {changePassword, hidePasswordForm, setPasswordFormField, showPasswordForm} from "../redux/actions";

const AccountFormFieldPassword = ({show, data, changePassword, hidePasswordForm, showPasswordForm, setPasswordFormField}) => {

    const {old_password, password, password_confirmation} = data;

    const submitHandler = () => {
        if(old_password.value.length > 0 && password.value.length > 0 && password_confirmation.value.length > 0){
            changePassword(
                old_password,
                password,
                password_confirmation
            );
        }
    };

    const changeInputHandler = (e) => {
        e.persist();
        setPasswordFormField(e.target.name, e.target.value)
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6 text-end">
                    <div className="field">Пароль:</div>
                </div>
                <div className="col">
                    <div
                        onClick={() => {show ? hidePasswordForm() : showPasswordForm()}}
                        className="set-password"
                    >{show ? 'отмена' : 'сменить пароль'}</div>
                </div>
            </div>
            {show && <div className="row">
                <div className="col-md-6 text-end">
                    <div className="field">Старый пароль:</div>
                </div>
                <div className="col">
                    <input
                        type="password"
                        className={`form-control ${old_password.error}`}
                        placeholder="Введите текущий пароль"
                        name="old_password"
                        value={old_password.value}
                        onChange={changeInputHandler}
                    />
                </div>
            </div>}
            {show && <div className="row">
                <div className="col-md-6 text-end">
                    <div className="field">Новый пароль:</div>
                </div>
                <div className="col">
                    <input
                        type="password"
                        className={`form-control ${password.error}`}
                        placeholder="Введите новый пароль"
                        name="password"
                        value={password.value}
                        onChange={changeInputHandler}
                    />
                </div>
            </div>}
            {show && <div className="row">
                <div className="col-md-6 text-end">
                    <div className="field">Подтвердите новый пароль:</div>
                </div>
                <div className="col">
                    <input
                        type="password"
                        className={`form-control ${password_confirmation.error}`}
                        placeholder="Введите новый пароль"
                        name="password_confirmation"
                        value={password_confirmation.value}
                        onChange={changeInputHandler}
                    />
                </div>
            </div>}
            {show && <div className="row">
                <div className="col"/>
                <div className="col">
                    <button type="button" onClick={submitHandler} className="btn btn-success btn-sm">Сохранить</button>
                </div>
            </div>}

        </React.Fragment>
    );
};

export default connect(
    state => ({show: state.user.forms.password.show, data: state.user.forms.password.data}),
    {changePassword, hidePasswordForm, showPasswordForm, setPasswordFormField}
)(AccountFormFieldPassword);
