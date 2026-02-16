import React, { useState } from "react";
import "./App.css";
import Item from "./Item.tsx";
import Header from "./Header.tsx";

const PRODUCTS = [
    { id: 1, name: "Apple", price: 120, imgUrl: "" },
    { id: 2, name: "Banana", price: 80, imgUrl: "" },
    { id: 3, name: "Orange", price: 45, imgUrl: "" },
];

function App() {
    const shopItems: Array<React.ReactElement> = PRODUCTS.map((item) => (
        <Item
            key={item.id}
            name={item.name}
            imgUrl={item.imgUrl}
            price={item.price}
        />
    ));

    return (
        <>
            <Header />
            <h1>Home Page</h1>
        </>
    );
}

export default App;
