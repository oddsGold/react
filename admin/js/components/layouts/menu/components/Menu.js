import React from "react";
import {connect} from "react-redux";
import MenuItemDropDown from "./MenuItemDropDown";
import MenuItem from "./MenuItem";
import {fetchMenu} from "../redux/actions";

const Menu = ({data, fetchMenu}) => {

    if(!data){
        fetchMenu();
    }

    return (
        <ul className="list-unstyled menu">
            {data && data.map((item, index) => {
                return (item.submenu && item.submenu.length > 0) ?
                    <MenuItemDropDown key={index} item={item}/> :
                    <MenuItem key={index} item={item}/>
            })}
        </ul>
    );
};

export default connect(
    state => ({data: state.layout.menu.data}),
    ({fetchMenu})
)(Menu);
