import { createItem } from "./Products.tsx";

export default function Cart({ cart, removeFromCart, onQtyChange }) {
    return (
        <>
            <h1>Cart Page</h1>
            <div className="shop">
                {cart.map((item) =>
                    createItem(
                        item,
                        removeFromCart,
                        "Remove From Cart",
                        onQtyChange,
                        item.quantity,
                    ),
                )}
            </div>
        </>
    );
}
