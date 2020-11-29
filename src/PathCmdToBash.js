import React from "react";

export default class PathCmdToBash extends React.Component {
    state = {
        convertedPath: "",
        pathValue: "",
        btnCopyState: "INIT",
    };
    copyHandler = (e) => {
        const resInputElm = document.getElementById("convertedPathInput");
        // const value = resInputElm.getAttribute("value");
        resInputElm.focus();
        resInputElm.select();
        document.execCommand("copy");
        this.setState({ btnCopyState: "COPPIED" });
        // state: btnCopyState: INIT, COPPIED,
    };
    handleChange = (e) => {
        const value = String.raw`${e.target.value}`;
        this.setState({ pathValue: value });
        // let cmdPath = String.raw`C:\Users\DuongNTSE\Desktop\vscode_projects\book-fullstack-react\exercise-files\food-lookup-complete`;
        // let bashPath = String.raw`/mnt/c/Users/DuongNTSE/Desktop/vscode_projects/book-fullstack-react/exercise-files/food-lookup-complete`;
        const cmdMatcher = /[A-Z]:\\((\w+(\-)?)?(\\)?)+/gi;
        const bashMatcher = /\/mnt\/[A-Z]((\w+(\-)?)?(\/)?)+/gi;
        const isCmdPath = cmdMatcher.test(value);
        const isBashPath = bashMatcher.test(value);

        this.setState({ btnCopyState: "INIT" });

        if (isCmdPath) {
            if (!value.includes("/")) {
                const convertedPath = String.raw`${this.convertToBashPath(
                    value
                )}`;
                this.setState({ convertedPath });
            } else {
                this.setState({ convertedPath: "" });
            }
        } else if (isBashPath) {
            if (!value.includes("\\")) {
                const convertedPath = String.raw`${this.convertToCmdPath(
                    value
                )}`;
                this.setState({ convertedPath });
            } else {
                this.setState({ convertedPath: "" });
            }
        } else this.setState({ convertedPath: "" });
    };
    convertToBashPath = (value) => {
        // let value ="C:\UsersDuongNTSEDesktop\vscode_projects\book-fullstack-reactexercise-files\food-lookup-complete";
        const bashPath = [
            "/mnt",
            ...String.raw`${value}`
                .split(/(:|\\)/)
                .filter((d) => !["", ":", `\\`].includes(d)),
        ].join("/");
        return bashPath.toLowerCase();
        // this.setState(bashPath);
    };
    convertToCmdPath = (value) => {
        // /mnt/c/Users/DuongNTSE/Desktop/vscode_projects/book-fullstack-react/exercise-files/food-lookup-complete
        let pathArr = String.raw`${value}`
            .replace("/mnt/", "")
            .split(/(\/)/)
            .filter((d) => !["", ":", "/"].includes(d));

        pathArr[0] = pathArr[0].toUpperCase() + ":";

        const cmdPath = String.raw`${pathArr.join("\\")}`;
        return cmdPath;
        // this.setState(cmdPath);
    };
    render() {
        return (
            <>
                <h2 className="ui header my-2">
                    Convert Path between CMD and BASH
                </h2>
                <div className="ui fluid action input">
                    <div className="ui button">CMD/Bash Path</div>
                    <input
                        id="inputPath"
                        value={this.state.pathValue}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="C:\Users or /mnt/c/Users"
                    />
                </div>
                <div className="ui fluid action input">
                    <input
                        id="convertedPathInput"
                        type="text"
                        value={this.state.convertedPath}
                        readOnly
                    />
                    <button
                        onClick={this.copyHandler}
                        className="ui teal right labeled icon button"
                    >
                        <i className="copy icon"></i>
                        {
                            {
                                INIT: "Copy",
                                COPPIED: "Copied",
                            }[this.state.btnCopyState]
                        }
                    </button>
                </div>
                <hr />
            </>
        );
    }
}
