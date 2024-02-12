import React from "react";
import {connect} from "react-redux";
import LoginFormTfa from "./components/LoginFormTfa";
import LoginFormBase from "./components/LoginFormBase";
import Loading from "../generic/Loading";
import {forgotTFA, login, loginTFA} from "./redux/actions";

const Login = ({user, settings, login, loginTFA, forgotTFA}) => {

    const {tfa, tfaQrCode} = user;
    const {fetching} = settings;

    return (
        <div className="login">
            {fetching && <Loading />}
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-lg-3 col-md-6 col-sm-6 align-self-center ">

                        <div className="form my-auto">
                            <div className="row justify-content-md-center">
                                <h2 className="h3 mb-4 text-center">LOGIN</h2>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {tfa ? <LoginFormTfa
                                        forgotTFA={forgotTFA}
                                        QrCode={tfaQrCode}
                                        loginTFA={loginTFA}
                                    /> : <LoginFormBase login={login}/>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({user: state.user, settings: state.settings}),
    {login, loginTFA, forgotTFA}
)(Login);
