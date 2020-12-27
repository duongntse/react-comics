import React, { Component } from "react";
// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Moment from "moment";
// import _ from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cloneDeep from "lodash/cloneDeep";

import { client } from "./api/apiClient";
import { helper } from "./api/helper";

// import FilterComicButtons from "./FilterComicButtons";
import FilterComicButtons from "./FilterBetaComicButtons";
import Countdown from "./Countdown";
import Loader from "./Loader";
import ComicCard from "./ComicCard";

import comicItems from "./api/beta_items.json";
window.comicItems = comicItems;

export class ComicChapters extends Component {
    state = {
        items: [],
        filteredItems: [],
        filteredSortedItems: [],
        activeComicSiteName: "All",
        loadingState: "LOADING",
    };

    loadItems = () => {
        const { activeComicSiteName } = this.state;

        client.loadBetaItems().then((items) => {
            const filteredItems = this.filterByComicSiteName(
                activeComicSiteName,
                items
            );
            const filteredSortedItems = helper.sortBetaItems(filteredItems);

            this.setState({
                items,
                filteredItems,
                filteredSortedItems,
                loadingState: "FINISHED",
            });
        });
    };

    filterByComicSiteName = (comicSiteName, items) => {
        if (comicSiteName === "All") {
            const filteredItems = cloneDeep(items);
            return filteredItems;
        } else {
            const filteredItems = cloneDeep(items).filter(
                (item) => item.website_name === comicSiteName
            );
            return filteredItems;
        }
    };

    onClickHandler = (comicSiteName) => {
        const filteredItems = this.filterByComicSiteName(
            comicSiteName,
            this.state.items
        );
        const filteredSortedItems = helper.sortBetaItems(filteredItems);

        this.setState({
            filteredItems,
            filteredSortedItems,
            activeComicSiteName: comicSiteName,
        });
    };

    componentDidMount() {
        this.setState({
            loadingState: "LOADING",
        });
        this.loadItems();
    }

    render() {
        const {
            items,
            filteredItems,
            filteredSortedItems,
            loadingState,
        } = this.state;
        if (loadingState === "LOADING")
            return (
                <div className="container my-4">
                    <Loader />
                </div>
            );
        return (
            <>
                <div className="mt-4 ml-4">
                    <Countdown
                        hour={0}
                        minute={1}
                        second={30}
                        callback={this.loadItems}
                    />
                </div>
                <Row className="text-center py-4">
                    <FilterComicButtons
                        items={items}
                        onClick={this.onClickHandler}
                    />
                </Row>

                <Row className="justify-content-md-start">
                    {filteredSortedItems.map((comic, ind) => {
                        return (
                            <Col xs={12} sm={6} md={4} lg={3} key={ind}>
                                <ComicCard {...comic} />
                            </Col>
                        );
                    })}
                </Row>
            </>
        );
    }
}
export default ComicChapters;
