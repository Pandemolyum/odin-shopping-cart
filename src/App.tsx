import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import "./App.css";
import Header from "./Header.tsx";
import Home from "./Home.tsx";
import Shop from "./Shop.tsx";
import Cart from "./Cart.tsx";
import type { cartData } from "./types.tsx";

interface fetchedData {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

function App() {
    const [products, setProducts] = useState<Array<cartData> | null>(null); // Fetched data
    const [cart, setCart] = useState<Array<cartData>>([]); // Cart data
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
                    response.map((item: fetchedData) => {
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
        (total, item: cartData) => (total = total + item.quantity),
        0,
    );

    const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        const parent = (e.target as HTMLElement).parentNode;
        if (!parent) return;

        const inputElement: Element | null = parent.querySelector("input.qty");
        if (!inputElement) return;

        const quantity = Number((inputElement as HTMLInputElement).value);
        if (quantity === 0) return;

        const productId = (parent as HTMLElement).dataset.productId;
        const itemInCart = cart.find(
            (item: cartData) => item.id === Number(productId),
        );

        if (products === null) return;
        const itemRaw: cartData = products.filter(
            (item) => item.id === Number(productId),
        )[0];

        if (itemInCart === undefined) {
            setCart([
                ...cart,
                { ...itemRaw, quantity: itemRaw.quantity + quantity },
            ]);
        } else {
            setCart(
                cart.map((item) =>
                    item.id === Number(productId)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                ),
            );
        }
    };

    const removeFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        const parent = (e.target as HTMLElement).parentNode;
        if (!parent) return;

        const productId = (parent as HTMLElement).dataset.productId;

        setCart(cart.filter((item) => item.id !== Number(productId)));
    };

    // useCallback ensures the function is not called again which would trigger the effect in Item.tsx
    const onQtyChange = useCallback((productId: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: quantity } : item,
            ),
        );
    }, []);

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
