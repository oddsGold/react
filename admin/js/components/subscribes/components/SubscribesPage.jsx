import React from "react";
import Pagination from "react-js-pagination";
import SubscribesList from "./SubscribesList";
import {exportToExcel} from "../redux/actions";

function SubscribesPage(props) {
    return(
        <div className="subscribes-admin-page">

            <SubscribesList
                subscribeList={props.subscribeList}
                deleteSubscribes={props.deleteSubscribes}
                exportToExcel={props.exportToExcel}
                totalItemsCount={props.totalItemsCount}
            />

            {props.totalItemsCount
                ? <Pagination
                    activePage={props.activePage}
                    itemsCountPerPage={props.perPage}
                    totalItemsCount={props.totalItemsCount}
                    onChange={props.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                : ""
            }
        </div>
    )
}

export default SubscribesPage;
