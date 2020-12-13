import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import items from "./api/items.json";
import Moment from "moment";
import _ from "lodash";

import "./App.css";
import PathCmdToBash from "./PathCmdToBash";

const Loading = () => (
    <div className="ui segment">
        <div className="ui active dimmer">
            <div className="ui text loader">Loading</div>
        </div>
        <p></p>
    </div>
);

const ComicSiteButtons = ({ items }) => {
    if (items && items.length > 0) {
        return items
            .reduce((acc, curr, currInd, arr) => {
                if (acc.length === 0) acc.push(curr);
                else {
                    if (
                        !acc
                            .map((a) => a.base_site_url)
                            .includes(curr.base_site_url)
                    )
                        acc.push(curr);
                }
                return acc;
            }, [])
            .map((comic, ind) => (
                <Button
                    className={"mx-1"}
                    key={ind}
                    target="_blank"
                    variant="outline-primary"
                    href={comic.base_site_url}
                >
                    {comic.base_site_name}
                </Button>
            ));
    } else {
        return [];
    }
};

const Copyright = () => (
    <>
        <h1>More Info: </h1>
        <p>
            I get sources from other pages as mentioned on the top of every
            card. So please access their pages to read more comics.
        </p>
        <p>
            About @copyrights, please contact:{" "}
            <b>
                <i>Duongntse@gmail.com</i>
            </b>
        </p>
    </>
);

const ComicChapters = ({ items }) => {
    const [comics, setComics] = useState(items || []);
    const [selectedComic, setSelectedComic] = useState("all");
    const filterByComicSite = (siteName) => {
        if (siteName === "all") {
            setComics(items);
            setSelectedComic("all");
        } else {
            const newItems = items.filter(
                (item) => item.base_site_name === siteName
            );
            setComics(newItems);
            setSelectedComic(siteName);
        }
    };
    const sites = items.reduce((acc, curr) => {
        if (acc.length === 0) acc.push(curr);
        else {
            if (!acc.map((a) => a.base_site_url).includes(curr.base_site_url))
                acc.push(curr);
        }
        return acc;
    }, []);

    return (
        <>
            <div className="container my-4">
                <PathCmdToBash />
            </div>
            <div className="container my-4 text-center">
                <span style={{ fontSize: "1.5em", color: "rgb(51, 51, 51)" }}>
                    Display:
                </span>
                {sites.length > 0 ? (
                    <>
                        <Button
                            className={`mx-1 ${
                                selectedComic === "all" ? "active" : ""
                            }`}
                            variant="outline-primary"
                            onClick={() => filterByComicSite("all")}
                            // href={comic.base_site_url}
                        >
                            All
                        </Button>
                        {sites.map((comic, ind) => (
                            <Button
                                className={`mx-1 ${
                                    selectedComic === comic.base_site_name
                                        ? "active"
                                        : ""
                                }`}
                                key={ind}
                                variant="outline-primary"
                                onClick={() =>
                                    filterByComicSite(comic.base_site_name)
                                }
                                // href={comic.base_site_url}
                            >
                                {comic.base_site_name}
                            </Button>
                        ))}
                    </>
                ) : (
                    "None"
                )}
            </div>

            <Row className="justify-content-md-start">
                {comics
                    .sort((a, b) => new Date(b.raw_time) - new Date(a.raw_time))
                    .map((comic, ind) => {
                        return (
                            <Col xs={12} sm={6} md={4} lg={2} key={ind}>
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
};

export class App extends React.Component {
    state = { items: [], isLoadedItems: true };

    componentDidMount() {
        this.setState({ isLoadedItems: true });
        fetch(`${process.env.PUBLIC_URL}/items.json`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                this.setState({ items, isLoadedItems: false });
            });
    }
    render() {
        const { items, isLoadedItems } = this.state;
        return (
            <div className="app">
                <div className="headerApp">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src={`${process.env.PUBLIC_URL}/logorb.svg`}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{" "}
                            Latest Comic Chapters
                        </Navbar.Brand>
                    </Navbar>
                </div>
                <div className="bodyApp">
                    <div className="p-4">
                        {isLoadedItems ? (
                            <Loading />
                        ) : (
                            <ComicChapters items={items} />
                        )}
                    </div>
                </div>
                <div className="footerApp">
                    <Jumbotron>
                        <Row>
                            <Col
                                style={{
                                    borderRight: "1px dashed black",
                                }}
                            >
                                <Copyright />
                            </Col>
                            <Col>
                                <h1>Comic Sites:</h1>
                                {isLoadedItems ? (
                                    <Loading />
                                ) : (
                                    <ComicSiteButtons items={items} />
                                )}
                            </Col>
                        </Row>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}

export default App;
