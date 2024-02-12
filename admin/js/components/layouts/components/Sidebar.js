import React from "react";
import {connect} from "react-redux";
import SidebarMenu from "../menu/components/Menu";

const Sidebar = () => {

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h3>Admin</h3>
            </div>
            <SidebarMenu />
        </nav>
    );
};

export default connect()(Sidebar);
