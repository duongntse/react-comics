import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { client } from "./api/apiClient";
import Loader from "./Loader";

export class Footer extends Component {
    state = {
        items: [],
        loadingState: "LOADING",
    };

    loadItems = () => {
        client.loadItems().then((items) => {
            this.setState({ items, loadingState: "FINISHED" });
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
        if (loadingState === "LOADING")
            return (
                <div className="container my-4">
                    <Loader />
                </div>
            );

        return (
            <Jumbotron>
                <Row>
                    <Col
                        style={{
                            borderRight: "1px dashed black",
                        }}
                    >
                        <h1>More Info: </h1>
                        <p>
                            I get sources from other pages as mentioned on the
                            top of every card. So please access their pages to
                            read more comics.
                        </p>
                        <p>
                            About @copyrights, please contact:{" "}
                            <b>
                                <i>Duongntse@gmail.com</i>
                            </b>
                        </p>
                    </Col>
                    <Col>
                        <h1>Comic Sites:</h1>
                        {items
                            .reduce((acc, curr) => {
                                if (acc.length === 0) acc.push(curr);
                                else {
                                    if (
                                        !acc
                                            .map((a) => a.website_url)
                                            .includes(curr.website_url)
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
                                    href={comic.website_url}
                                >
                                    {comic.website_name}
                                </Button>
                            ))}
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default Footer;
