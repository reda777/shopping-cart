import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Nav from "./Nav";
describe("Nav component", () => {
  it("Toggle shopping cart window", async () => {
    const setCart = jest.fn();
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Nav cart={[]} setCart={setCart} />
      </BrowserRouter>
    );
    const toggleBtn = screen.getByTestId("toggleCart");
    //simulate click on toggleCart class
    expect(screen.queryByTestId("cart")).not.toBeInTheDocument();
    await act(() => user.click(toggleBtn));
    expect(screen.getByTestId("cart")).toBeInTheDocument();
    await act(() => user.click(toggleBtn));
    expect(screen.queryByTestId("cart")).not.toBeInTheDocument();
  });
});
