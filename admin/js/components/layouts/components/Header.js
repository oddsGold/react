import React from 'react';
import HeaderUserInfo from "./HeaderUserInfo";
import HeaderMenu from "./HeaderMenu";

export default function Header() {


    return (
        <div className="header">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <HeaderMenu />
                <HeaderUserInfo/>
            </nav>
        </div>
    );
}
