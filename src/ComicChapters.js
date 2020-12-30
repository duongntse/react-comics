import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ReduxFilterComicButtons from "./ReduxFilterComicButtons";
import Countdown from "./Countdown";
import Loader from "./Loader";
import ComicCard from "./ComicCard";

export const ComicChapters = (props) => {
    const { isLoading, filteredSortedComics } = props;
    if (isLoading)
        return (
            <div className="container my-4">
                <Loader />
            </div>
        );
    return (
        <>
            <div className="container my-4">
                <Row className="text-center py-4">
                    <div className="mt-4 ml-4">
                        <Countdown
                            hour={0}
                            minute={1}
                            second={30}
                            callback={props.fetchComics}
                        />
                    </div>
                </Row>
                <Row className="text-center py-4">
                    <ReduxFilterComicButtons />
                </Row>

                <Row className="justify-content-md-start">
                    {filteredSortedComics.map((comic, ind) => {
                        return (
                            <Col xs={12} sm={6} md={4} lg={3} key={ind}>
                                <ComicCard {...comic} />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </>
    );
};

export default ComicChapters;
