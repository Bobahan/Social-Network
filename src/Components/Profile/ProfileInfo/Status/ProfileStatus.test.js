import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in local state", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
    });
});

describe("ProfileStatus component", () => {
    test("span should be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const instance = component.root;
        let span = instance.findByType("span")
        expect(span).not.toBeNull()
    });
});

describe("ProfileStatus component", () => {
    test("input should not be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const instance = component.root;
        expect(() => {
            let input = instance.findByType("input")
        }).toThrow()
    });
});

describe("ProfileStatus component", () => {
    test("span should have correct status", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const instance = component.root;
        let span = instance.findByType("span")
        expect(span.children[0]).toBe("it-kamasutra.com")
    });
});

describe("ProfileStatus component", () => {
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const instance = component.root;
        let span = instance.findByType("span");
        span.props.onDoubleClick();
        let input = instance.findByType("input");
        expect(input)
    });
});