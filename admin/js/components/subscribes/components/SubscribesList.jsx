import React from "react";
import ContentHeader from "../../layouts/components/ContentHeader";

function SubscribesList(props) {
    return(
        <>
            <ContentHeader>
                Subscribes
            </ContentHeader>

            <div className="export">
                <button className={`btn btn-md btn-info ${!props.totalItemsCount && 'disabled'}`} onClick={() => {props.exportToExcel()}}>Export to Excel</button>
            </div>

            <div className="video-list subscribes-list">
                <div className="video-list-table">
                    <div className="video-list-table-header">
                        <div className="row">
                            <div className="col-lg-1">
                                <p>ID</p>
                            </div>
                            <div className="col-lg-11">
                                <p>Email</p>
                            </div>
                        </div>
                    </div>
                    <div className="video-list-table-body">
                        {
                            props.subscribeList.map((item, index) => {
                                return (
                                    <div className="video-list-table-body-row" key={item.id}>
                                        <div className="row">
                                            <div className="col-lg-1">
                                                <p>{item.id}</p>
                                            </div>
                                            <div className="col-lg-10">
                                                <p>
                                                    {item.email}
                                                </p>
                                            </div>
                                            <div className="col-lg-1 text-end">
                                                <button type="button" className="btn btn-danger" onClick={() => {props.deleteSubscribes(item.id)}}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default SubscribesList;
