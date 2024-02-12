import React from "react";

export default function Loading(){
    return (
        <div className="custom-loading">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
