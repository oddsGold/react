import React from "react";
import {connect} from "react-redux";
import LoadingGeneric from "../../generic/Loading";

const Loading = ({fetching, children}) => {

    return (
        <React.Fragment>
            {fetching && <LoadingGeneric />}
            {children}
        </React.Fragment>
    );

};

export default connect(state => ({fetching: state.settings.fetching}))(Loading);
