import React, { Component } from "react";
// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { client } from "./api/apiClient";

import FilterComicButtons from "./FilterComicButtons";
import Countdown from "./Countdown";
import Loader from "./Loader";

export class ComicChapters extends Component {
    state = {
        items: [],
        sortedItems: [],
        activeComicSiteName: "All",
        loadingState: "LOADING",
    };

    loadItems = () => {
        client.loadItems().then((items) => {
            const sortedItems = this.filterByComicSiteName("All", items);
            this.setState({ items, sortedItems, loadingState: "FINISHED" });
        });
    };

    filterByComicSiteName = (comicSiteName, items) => {
        if (comicSiteName === "All") {
            const sortedItems = cloneDeep(items).sort(
                (a, b) => new Date(b.raw_time) - new Date(a.raw_time)
            );

            return sortedItems;
        } else {
            const sortedItems = cloneDeep(items)
                .filter((item) => item.base_site_name === comicSiteName)
                .sort((a, b) => new Date(b.raw_time) - new Date(a.raw_time));

            return sortedItems;
        }
    };

    onClickHandler = (comicSiteName) => {
        const sortedItems = this.filterByComicSiteName(
            comicSiteName,
            this.state.items
        );
        this.setState({ sortedItems, activeComicSiteName: comicSiteName });
    };

    componentDidMount() {
        this.setState({
            loadingState: "LOADING",
        });
        this.loadItems();
    }

    render() {
        const { items, sortedItems, loadingState } = this.state;
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
                    {sortedItems.map((comic, ind) => {
                        return (
                            <Col xs={12} sm={6} md={4} lg={3} key={ind}>
                                <Card
                                    border="info"
                                    className="text-center my-1"
                                    style={{
                                        // width: "14rem",
                                        height: "470px",
                                        padding: "0px",
                                    }}
                                >
                                    <Card.Header overflow="hidden">
                                        <Card.Title>
                                            <Card.Link
                                                className="text-dark"
                                                href={comic.base_site_url}
                                            >
                                                {_.truncate(
                                                    comic.base_site_name,
                                                    {
                                                        length: 15,
                                                    }
                                                )}
                                            </Card.Link>
                                        </Card.Title>
                                    </Card.Header>
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "288px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={comic.cover_img}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                // maxHeight: "250px",
                                                marginLeft: "50%",
                                                transform: "translateX(-50%)",
                                            }}
                                        />
                                    </div>

                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Link
                                                className="text-dark"
                                                href={comic.comic_url}
                                            >
                                                {_.truncate(comic.comic_name, {
                                                    length: 35,
                                                })}
                                            </Card.Link>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {Moment(comic.raw_time).fromNow()}
                                        </Card.Subtitle>
                                        <a
                                            className="m-1 chapterNumberLink"
                                            href={comic.chapter_number_link}
                                        >
                                            {comic.chapter_number_text}
                                        </a>

                                        {comic.prev_chap ? (
                                            <a
                                                className="m-1 chapterNumberLink"
                                                href={
                                                    comic.prev_chap
                                                        .chapter_number_link
                                                }
                                            >
                                                {
                                                    comic.prev_chap
                                                        .chapter_number_text
                                                }
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </>
        );
    }
}
export default ComicChapters;
