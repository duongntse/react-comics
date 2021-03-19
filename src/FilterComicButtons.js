import React from "react";
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Loader from "./Loader";

export const FilterComicButtons = (props) => {
    const { comics, isLoading, filterBy } = props;

    const getUniqueComics = (comics) => {
        return comics.reduce((acc, curr) => {
            if (acc.length === 0) acc.push(curr);
            else {
                if (!acc.map((a) => a.website_url).includes(curr.website_url))
                    acc.push(curr);
            }
            return acc;
        }, []);
    };

    if (isLoading) return <Loader />;
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
                className={`mx-1 my-1 ${filterBy === "All" ? "active" : ""}`}
                variant="outline-primary"
                onClick={() => {
                    props.setFilterBy("All");
                }}
            >
                All
            </Button>
            {getUniqueComics(comics).map((comic, ind) => (
                <Button
                    key={ind}
                    className={`mx-1 my-1 ${
                        filterBy === comic.website_name ? "active" : ""
                    }`}
                    variant="outline-primary"
                    onClick={() => {
                        props.setFilterBy(comic.website_name);
                    }}
                >
                    {comic.website_name}
                </Button>
            ))}
        </Col>
    );
};

export default FilterComicButtons;
