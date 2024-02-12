import React from "react";

function ContentHeader(props) {
    return(
        <div className="content-header">
            <h1>
                {props.children}
            </h1>
        </div>
    )
}

export default ContentHeader;
