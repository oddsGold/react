import React from "react";
import {Link} from "react-router-dom";

export default function MenuItem({item}){

    return (
        <li className="nav-item">
            {item.reference ?
                <a className="nav-link" href={item.urn}>{item.name}</a> :
                <Link className="nav-link" to={item.urn} >{item.name}</Link>
            }
        </li>
    );
}
