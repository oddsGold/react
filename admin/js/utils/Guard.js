import React from "react";
import {connect} from "react-redux";
import Login from "../components/user/Login";
import {fetchUser, refreshAuthentication} from "../components/user/redux/actions";

const Guard = ({authenticated, triedToRefreshAuthenticated, children, refreshAuthentication, fetchUser}) => {

    // const {authenticated, triedToRefreshAuthenticated, login, email, role} = user;
    // const {fetching} = settings;

    if(!authenticated && !triedToRefreshAuthenticated){
        refreshAuthentication();
    }

    if(authenticated){
        fetchUser();
    }



    // if(authenticated && !fetching && !login && !email){
    //     //debugger;
    //     fetchUser();
    // }

    return (
        authenticated ? children : <Login />
    );

};

export default connect(
    state => ({authenticated: state.user.authenticated, triedToRefreshAuthenticated: state.user.triedToRefreshAuthenticated}),
    ({refreshAuthentication, fetchUser})
)(Guard);
