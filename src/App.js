import React, { Component } from "react";
// import _ from "lodash";
import "./App.css";
import apiClient from "./api/apiClient";
import PathCmdToBash from "./PathCmdToBash";
import ComicChapters from "./ComicChapters";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import Countdown from "./Countdown";
import Loader from "./Loader";

export class App extends Component {
    state = {
        items: [],
        loadingState: "LOADING",
    };

    loadItems = () => {
        apiClient.loadItems("items.json", (items) => {
            this.setState({
                items,
                loadingState: "FINISHED",
            });
        });
    };

    componentDidMount() {
        this.setState({
            loadingState: "LOADING",
        });
        this.loadItems();
    }
    render() {
        const { items, loadingState } = this.state;

        return (
            <div className="app">
                <div className="headerApp">
                    <TopNavbar />
                </div>
                <div className="mt-4 position-fixed ml-4">
                    <Countdown
                        hour={0}
                        minute={1}
                        second={30}
                        callback={this.loadItems}
                    />
                </div>
                <div className="bodyApp">
                    <div className="p-4">
                        <div className="container my-4">
                            <PathCmdToBash />
                        </div>
                        <div className="container my-4">
                            {
                                {
                                    LOADING: (
                                        <div className="container my-4">
                                            <Loader />
                                        </div>
                                    ),
                                    FINISHED: <ComicChapters items={items} />,
                                }[loadingState]
                            }
                        </div>
                    </div>
                </div>
                <div className="footerApp">
                    {
                        {
                            LOADING: (
                                <div className="container my-4">
                                    <Loader />
                                </div>
                            ),
                            FINISHED: <Footer items={items} />,
                        }[loadingState]
                    }
                </div>
            </div>
        );
    }
}

export default App;
