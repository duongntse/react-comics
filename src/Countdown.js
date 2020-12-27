import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
require("twix");
require("moment-precise-range-plugin");

const manyOrOne = (numb) => (numb > 1 ? "s" : "");
const buildTimeString = (timeFragmentValue, timeFragmentName) => `
        ${
            timeFragmentValue >= 0
                ? `${timeFragmentValue}
                  ${timeFragmentName}${manyOrOne(timeFragmentValue)}`
                : ""
        }
        `;

export class Countdown extends Component {
    state = {
        // count: 0,
        countText: "", //
        timeOfFuture: null, // default 10 minutes
        // timeOfNow: null, // default 10 minutes
    };

    initTimer = ({ year, month, day, hour, minute, second }) => {
        const timeOfFuture = moment()
            .add(year, "year")
            .add(month, "month")
            .add(day, "day")
            .add(hour, "hour")
            .add(minute, "minute")
            .add(second, "second");

        const timeOfNow = moment();

        const diff = new Date(timeOfFuture) - Date.now();

        return { timeOfFuture, timeOfNow, diff };
    };

    oldObsoleteConvertCountToDate = () => {
        const { timeOfFuture } = this.state;

        let second = timeOfFuture.second() - moment().second();
        let minute = timeOfFuture.minute() - moment().minute();
        let hour = timeOfFuture.hour() - moment().hour();
        let day = timeOfFuture.day() - moment().day();
        let month = timeOfFuture.month() - moment().month();
        let year = timeOfFuture.year() - moment().year();

        if (second < 0) {
            second = second + 60;
            minute = minute - 1;
        }

        if (minute < 0 && hour > 0) {
            minute = minute + 60;
            hour = hour - 1;
        }
        if (hour < 0 && day > 0) {
            hour = hour + 24;
            day = day - 1;
        }
        if (day < 0 && month > 0) {
            day = day + timeOfFuture.daysInMonth();
            month = month - 1;
        }
        if (month < 0 && year > 0) {
            month = month + 1;
            year = year - 1;
        }

        const yearString =
            this.props.year && this.props.year >= 0
                ? buildTimeString(year, "year")
                : "";
        const monthString =
            this.props.month && this.props.month >= 0
                ? buildTimeString(month, "month")
                : "";
        const dayString =
            this.props.day && this.props.day >= 0
                ? buildTimeString(day, "day")
                : "";
        const hourString =
            this.props.hour && this.props.hour >= 0
                ? buildTimeString(hour, "hour")
                : "";
        const minuteString =
            this.props.minute && this.props.minute >= 0
                ? buildTimeString(minute, "minute")
                : "";
        const secondString = buildTimeString(second, "second");

        const countText = `${yearString} ${monthString} ${dayString}  ${hourString}  ${minuteString}  ${secondString}`;

        return countText;
    };

    preciseDiffOfFutureAndNow = () => {
        const { timeOfFuture } = this.state;

        var m1 = timeOfFuture.format("YYYY-MM-DD HH:mm:ss");
        var m2 = moment().format("YYYY-MM-DD HH:mm:ss");
        var diff = moment.preciseDiff(m1, m2);
        // console.log(
        //     moment("1982-01-25T09:30").twix("1982-01-25T13:30").format()
        // );
        return diff;
    };

    componentDidMount() {
        const { timeOfFuture, diff } = this.initTimer(this.props);
        this.setState({ timeOfFuture });

        // countdown every any seconds, minutes, hours, or days
        this.runCallbackInterval = setInterval(() => {
            this.props.callback();
            const { timeOfFuture } = this.initTimer(this.props);
            this.setState({ timeOfFuture });
        }, diff);

        // update every 1 second
        this.updateCounterInterval = setInterval(() => {
            const countText = this.preciseDiffOfFutureAndNow();
            this.setState({ countText });
        }, 1000);
    }
    componentDidUpdate() {
        //
    }
    componentWillUnmount() {
        clearInterval(this.runCallbackInterval);
        clearInterval(this.updateCounterInterval);
    }

    render() {
        const { countText } = this.state;
        if (countText.trim().length === 0) return "";
        return (
            <div
                style={{
                    display: "flex",
                }}
            >
                <h6>
                    Data will be updated in{" "}
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.5em",
                        }}
                    >
                        {countText}
                    </span>
                </h6>
            </div>
        );
    }
}

Countdown.propTypes = {
    callback: PropTypes.func,
};

Countdown.defaultProps = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
};

export default Countdown;
