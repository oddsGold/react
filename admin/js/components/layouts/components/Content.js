import React from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import Main from "./Main";

const Content = () => {

    return (
        <div className="content">
            <Header/>
            <Main/>
        </div>
    );
}

export default connect()(Content);
