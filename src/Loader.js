import React from "react";

export const Loader = () => (
    <div className="html ui top attached segment">
        <div className="ui segment" style={{ minHeight: 100 }}>
            <div className="ui active dimmer">
                <div className="ui text loader">Loading</div>
            </div>
            <p></p>
        </div>
    </div>
);
export default Loader;
