import { createItem } from "./Products.tsx";
import type { cartData, inputEventVoid, cartQtyUpdateVoid } from "./types.tsx";

export default function Cart({
    cart,
    removeFromCart,
    onQtyChange,
}: {
    cart: Array<cartData>;
    removeFromCart: inputEventVoid;
    onQtyChange: cartQtyUpdateVoid;
}) {
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
