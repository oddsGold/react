import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import SubscribesPage from "./SubscribesPage";
import {deleteSubscribes, exportToExcel, savePageAndGetSubscribes} from "../redux/actions";

function SubscribesContainer(props) {
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        props.savePageAndGetSubscribes(activePage, pageSize);
    }, [])

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        props.savePageAndGetSubscribes(pageNumber, pageSize);
    }

    return(
        <SubscribesPage
            activePage={activePage}
            totalItemsCount={props.subscribesCount}
            perPage={props.perPage}
            handlePageChange={handlePageChange}
            subscribeList={props.subscribeList}
            deleteSubscribes={props.deleteSubscribes}
            exportToExcel={props.exportToExcel}
        />
    )

}

let mapStateToProps = (state) => {
    return {
        subscribeList: state.layout.subscribe.subscribeList,
        subscribesCount: state.layout.subscribe.subscribesCount,
        perPage: state.layout.subscribe.perPage
    }
}

export default compose(
    connect(mapStateToProps,
        {
            savePageAndGetSubscribes,
            deleteSubscribes,
            exportToExcel
        })
)(SubscribesContainer)
