import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class FilterComicButtons extends Component {
    state = {
        siteName: "All",
    };
    retrieveComics = (items) => {
        return items.reduce((acc, curr) => {
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
        }, []);
    };

    render() {
        const { items } = this.props;
        const { siteName } = this.state;
        return (
            <Col className="mx-2">
                <span
                    style={{
                        minHeight: `1rem`,
                        fontSize: "2rem",
                        fontWeight: "bold",
                    }}
                >
                    Display:
                </span>
                <Button
                    className={`mx-1 my-1 ${
                        siteName === "All" ? "active" : ""
                    }`}
                    variant="outline-primary"
                    onClick={() => {
                        this.props.onClick("All");
                        this.setState({ siteName: "All" });
                    }}
                >
                    All
                </Button>
                {this.retrieveComics(items).map((comic, ind) => (
                    <Button
                        className={`mx-1 my-1 ${
                            siteName === comic.base_site_name ? "active" : ""
                        }`}
                        key={ind}
                        variant="outline-primary"
                        onClick={() => {
                            this.props.onClick(comic.base_site_name);
                            this.setState({ siteName: comic.base_site_name });
                        }}
                    >
                        {comic.base_site_name}
                    </Button>
                ))}
            </Col>
        );
    }
}

export default FilterComicButtons;
