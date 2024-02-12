import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../user/redux/actions";

const HeaderUserInfo = ({name, role, logout}) => {



    return (
        <ul className="navbar-nav ms-md-auto">
            <li className="nav-item">
                <Link className="nav-link nav-user" to="/admin/account" >
                    {/*<i className="fas fa-user mr-2" /> */}
                    {name}
                    <span className="badge bg-secondary">{role}</span>
                </Link>
            </li>
            <li className="nav-item">
                <a onClick={() => logout()} className="nav-link logout">Выйти</a>
            </li>
        </ul>
    );
}

export default connect(state => ({name: state.user.login, role: state.user.role}), {logout})(HeaderUserInfo);
