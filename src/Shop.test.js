import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Shop from "./Shop";
describe("Nav component", () => {
  it("Render products", async () => {
    const setCart = jest.fn();
    render(
      <BrowserRouter>
        <Shop cart={[]} setCart={setCart} />
      </BrowserRouter>
    );
    expect(screen.getAllByTestId("prod").length).toBe(6);
  });
  it("Show 'added cart' for product in cart", () => {
    const setCart = jest.fn();
    const cartTest = [
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
      },
    ];

    render(
      <BrowserRouter>
        <Shop cart={cartTest} setCart={setCart} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("addedCart")).toBeInTheDocument();
  });
  it("Clicking add product adds it to the cart", async () => {
    const setCart = jest.fn();
    const cart = [];
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Shop cart={cart} setCart={setCart} />
      </BrowserRouter>
    );

    const addCartButton = screen.getAllByTestId("addCart")[0];
    const quantityInput = screen.getAllByTestId("quantity")[0];

    await act(() => user.clear(quantityInput));
    await act(() => user.type(quantityInput, "2"));

    await act(() => user.click(addCartButton));

    expect(setCart).toHaveBeenCalledTimes(1);
    expect(setCart).toHaveBeenCalledWith([
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 2,
      },
    ]);
  });
});
