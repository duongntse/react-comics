import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export class TopNavbar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="/harrygold_logo_ver4.svg"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{" "}
                    {/*  */}
                </Navbar.Brand>
                <Link className="ui item" to="/comics_alpha">
                    <Button className={"mx-1"} variant="outline-light">
                        {"Alpha Comics"}
                    </Button>
                </Link>
                <Link className="ui item" to="/comics_beta">
                    <Button className={"mx-1"} variant="outline-light">
                        {"Beta Comics"}
                    </Button>
                </Link>
            </Navbar>
        );
    }
}

export default TopNavbar;
