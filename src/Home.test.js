import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

it("render home page",() => {
    render(<Home />);
    screen.getByText(/Store Home/);
});
