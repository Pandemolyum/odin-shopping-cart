import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./App.css";
import Header from "./Header.tsx";
import Home from "./Home.tsx";
import Shop from "./Shop.tsx";
import Cart from "./Cart.tsx";

function App() {
    const [products, setProducts] = useState(null); // Fetched data
    const [cart, setCart] = useState([]); // Cart data
    const [loading, setLoading] = useState(true); // Display loading while products are being fetched
    const [error, setError] = useState(null); // Display error if fetch fails

    // Set document title
    useEffect(() => {
        document.title = "Shopping Cart";
    }, []);

    // Fetch products
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response) =>
                setProducts(
                    response.map((item) => {
                        return {
                            id: item.id,
                            name: item.title,
                            price: item.price,
                            quantity: 0,
                            imgUrl: item.image,
                        };
                    }),
                ),
            )
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    const { name } = useParams(); // For page routing

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
        const itemRaw = products.filter((item) => item.id == productId)[0];

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

    // This function determines what the Shop page will output in case errors are encountered
    const shop = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>A network error was encountered</p>;
        return <Shop addToCart={addToCart} products={products} />;
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
                shop()
            ) : (
                <Home />
            )}
        </>
    );
}

export default App;
