import React from 'react';
import {Link} from "react-router-dom";

export default function HeaderMenu({}){


    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" href="/">На сайт</a>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin" >Дашборд</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/account" >Настройки</Link>
            </li>
        </ul>
    );
}
