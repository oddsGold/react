import React from 'react';
import {Route, Switch} from "react-router-dom";
import NotFound from "./error/NotFound";
import Account from "./user/Account";
import Dashboard from "./layouts/dashboard";
import VideoContainer from "./video/components/VideoContainer";
import VideoEditContainer from "./video/components/VideoEditContainer";
import VideoCreateContainer from "./video/components/VideoCreateContainer";
import SubscribesContainer from "./subscribes/components/SubscribesContainer";


export default function Routes(){
    return (
        <Switch>

            <Route exact path="/admin">
                <Dashboard />
            </Route>

            <Route path="/admin/account">
                <Account />
            </Route>

            <Route exact path="/admin/video">
                <VideoContainer />
            </Route>

            <Route path="/admin/video/:videoId?/edit">
                <VideoEditContainer />
            </Route>

            <Route exact path="/admin/video/create">
                <VideoCreateContainer />
            </Route>

            <Route exact path="/admin/subscribe">
                <SubscribesContainer />
            </Route>

            <Route path="*">
                <NotFound />
            </Route>

        </Switch>
    );
}
