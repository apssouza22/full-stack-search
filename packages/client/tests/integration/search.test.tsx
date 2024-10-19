import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react'

import App from '../../src/app';

describe("Application", () => {

    it("should renders search input", () => {
        render(<App/>);
        const input = screen.getByPlaceholderText("Search accommodation...");
        expect(input).toBeInTheDocument();
    });
    it("should update input field and delay the API call", async () => {

    });

    it("should cancel ongoing API call before starting a new API call", async () => {

    });

    it("should show spinner when fetching and hide when done", async () => {

    });

    it("should display search results", async () => {

    });

    it("should reset input when the clear button is clicked", async () => {

    });

    it("should navigate to the item page when the result item is clicked", async () => {

    });
})
