import { useState } from "react";
import { useParams } from "react-router";
import "./App.css";
import Header from "./Header.tsx";
import Home from "./Home.tsx";
import Shop from "./Shop.tsx";
import Cart from "./Cart.tsx";
import { RAW_PRODUCTS } from "./Products.tsx";

function App() {
    const { name } = useParams();

    const [cart, setCart] = useState([]);

    const totalItems = cart.reduce(
        (total, item) => (total = total + item.quantity),
        0,
    );

    const addToCart = (e) => {
        const parent = e.target.parentNode;
        const quantity = Number(parent.querySelector("input.qty").value);
        if (quantity === 0) return;

        const productId = parent.dataset.productId;
        const itemInCart = cart.find((item) => item.id == productId);
        const itemRaw = RAW_PRODUCTS.filter((item) => item.id == productId)[0];

        if (itemInCart === undefined) {
            setCart([
                ...cart,
                { ...itemRaw, quantity: itemRaw.quantity + quantity },
            ]);
        } else {
            setCart(
                cart.map((item) =>
                    item.id == productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                ),
            );
        }
    };

    const removeFromCart = (e) => {
        const parent = e.target.parentNode;
        const productId = parent.dataset.productId;

        setCart(cart.filter((item) => item.id != productId));
    };

    const onQtyChange = (productId, quantity) => {
        setCart(
            cart.map((item) =>
                item.id == productId ? { ...item, quantity: quantity } : item,
            ),
        );
    };

    return (
        <>
            <Header totalItems={totalItems} />
            {name === "cart" ? (
                <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    onQtyChange={onQtyChange}
                />
            ) : name === "shop" ? (
                <Shop addToCart={addToCart} />
            ) : (
                <Home />
            )}
        </>
    );
}

export default App;
