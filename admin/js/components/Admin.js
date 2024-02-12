import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import store from "../redux/store";
import {Provider} from "react-redux";
import Content from "./layouts/components/Content";
import Sidebar from "./layouts/components/Sidebar";
import Guard from "../utils/Guard";
import Loading from "./layouts/components/Loading";

export default function Admin() {

    return (
        <Provider store={store}>
            <Router>

                <ReactNotification />
                <Guard>
                    <div className="admin">
                        <Loading>
                            <Sidebar/>
                            <Content/>
                        </Loading>
                    </div>
                </Guard>

            </Router>
        </Provider>
    );
}
