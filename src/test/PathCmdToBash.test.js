import React from "react";
import { shallow } from "enzyme";
import PathCmdToBash from "../PathCmdToBash";

describe("PathCmdToBash", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PathCmdToBash />);
    });

    describe("user populate input on 'CMD/Bash Path'", () => {
        //
        const value = String.raw`C:\Users`;
        beforeEach(() => {
            wrapper
                .find("#inputPath")
                .first()
                .simulate("change", { target: { value: value } });
        });

        it("should set state property 'pathValue' to 'value'", () => {
            expect(wrapper.state().pathValue).toEqual(value);
        });
    });
});
