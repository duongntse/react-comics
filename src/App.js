import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
// import _ from "lodash";
import "./App.css";

import PathCmdToBash from "./PathCmdToBash";
import ComicChapters from "./ComicChapters";
import BetaFeature from "./BetaFeature";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import NoMatch from "./NoMatch";

export class App extends Component {
    componentDidMount() {}
    render() {
        return (
            <div className="app">
                <div className="headerApp">
                    <TopNavbar />
                </div>

                <div className="bodyApp">
                    <div className="p-4">
                        <div className="container my-4">
                            <PathCmdToBash />
                        </div>
                        <div className="container my-4">
                            <Switch>
                                <Route
                                    path="/comics_alpha"
                                    component={ComicChapters}
                                />
                                <Route
                                    path="/beta_feature"
                                    component={BetaFeature}
                                />
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Redirect to="/comics_alpha" />
                                    )}
                                />
                                <Route component={NoMatch} />
                            </Switch>
                        </div>
                    </div>
                </div>
                <div className="footerApp">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
