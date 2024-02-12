import React, {useState} from "react";
import MenuItem from "./MenuItem";

export default function MenuItemDropDown({item}){

    const [show, setShow] = useState(false);

    return (
        <li>
            <a
                onClick={() => setShow(!show)}
                className={show ? 'active' : ''}
            >
                {item.name}
                {show ? <i className="fas fa-caret-up"/> : <i className="fas fa-caret-down"/>}
            </a>
            <ul className={`list-unstyled ${show ? 'd-block' : 'd-none'}`}>
                {item.submenu.map((c, i) => {
                    return <MenuItem key={i} item={c}/>
                })}
            </ul>
        </li>
    );

}
