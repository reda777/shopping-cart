import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Checkout from "./Checkout";
describe("Cart component", () => {
  it("Render empty shopping cart", () => {
    const cart = [];
    const setCart = jest.fn();
    render(
      <BrowserRouter>
        <Checkout cart={cart} setCart={setCart} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
    expect(screen.queryAllByTestId("prod").length).toBe(0);
    expect(screen.getByTestId("totalPrice")).toBeInTheDocument();
  });
  it("Render non-empty shopping cart", () => {
    const cart = [
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 1,
      },
    ];
    const setCart = jest.fn();
    render(
      <BrowserRouter>
        <Checkout cart={cart} setCart={setCart} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
    expect(screen.queryAllByTestId("prod").length).toBe(1);
    expect(screen.getByTestId("totalPrice")).toBeInTheDocument();
  });
  it("Remove product from the cart", async () => {
    const cart = [
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 1,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ];
    const setCart = jest.fn();
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Checkout cart={cart} setCart={setCart} />
      </BrowserRouter>
    );
    const removeBtn = screen.getAllByTestId("removeCart")[1];
    expect(screen.queryAllByTestId("prod").length).toBe(2);
    await act(() => user.click(removeBtn));
    expect(setCart).toHaveBeenCalledTimes(1);
    expect(setCart).toHaveBeenCalledWith([
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 1,
      },
    ]);
  });
  it("Increment product's quantity", async () => {
    const cart = [
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 1,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ];
    const setCart = jest.fn();
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Checkout cart={cart} setCart={setCart} />
      </BrowserRouter>
    );
    const plusBtn = screen.getAllByTestId("plusBtn")[0];
    await act(() => user.click(plusBtn));
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
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ]);
  });
  it("Increment product's quantity past stock", async () => {
    const cart = [
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 20,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ];
    const setCart = jest.fn();
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Checkout cart={cart} setCart={setCart} />
      </BrowserRouter>
    );
    const plusBtn = screen.getAllByTestId("plusBtn")[0];
    await act(() => user.click(plusBtn));
    expect(setCart).toHaveBeenCalledTimes(1);
    expect(setCart).toHaveBeenCalledWith([
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 20,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ]);
  });
  it("Decrement product's quantity", async () => {
    const cart = [
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 2,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ];
    const setCart = jest.fn();
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Checkout cart={cart} setCart={setCart} />
      </BrowserRouter>
    );
    const minusBtn = screen.getAllByTestId("minusBtn")[0];
    await act(() => user.click(minusBtn));
    expect(setCart).toHaveBeenCalledTimes(1);
    expect(setCart).toHaveBeenCalledWith([
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 1,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ]);
  });
  it("Decrement product's quantity under 1", async () => {
    const cart = [
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 1,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ];
    const setCart = jest.fn();
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Checkout cart={cart} setCart={setCart} />
      </BrowserRouter>
    );
    const minusBtn = screen.getAllByTestId("minusBtn")[0];
    await act(() => user.click(minusBtn));
    expect(setCart).toHaveBeenCalledTimes(1);
    expect(setCart).toHaveBeenCalledWith([
      {
        id: 0,
        img: "https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg",
        name: "Ryzen 7 8000X",
        stock: 20,
        price: 2500,
        quantity: 1,
      },
      {
        id: 1,
        img: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg",
        name: "Nvidia 3100 TI",
        stock: 5,
        price: 20000,
        quantity: 1,
      },
    ]);
  });
});