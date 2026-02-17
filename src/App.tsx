import { useState } from "react";
import { useParams } from "react-router";
import "./App.css";
import Header from "./Header.tsx";
import Home from "./Home.tsx";
import Shop from "./Shop.tsx";
import Cart from "./Cart.tsx";

function App() {
    const { name } = useParams();

    const [cart, setCart] = useState([]);

    const totalItems = cart.reduce(
        (total, item) => (total = total + item.quantity),
        0,
    );

    const addToCart = () => {};

    // const removeFromCart = () => {
    //   setCart()
    // }

    return (
        <>
            <Header totalItems={totalItems} />
            {name === "cart" ? (
                <Cart cart={cart} />
            ) : name === "shop" ? (
                <Shop addToCart={addToCart} />
            ) : (
                <Home />
            )}
        </>
    );
}

export default App;
