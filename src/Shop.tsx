import { createItem } from "./Products.tsx";
import type { cartData, inputEventVoid } from "./types.tsx";

export default function Shop({
    addToCart,
    products,
}: {
    addToCart: inputEventVoid;
    products: Array<cartData> | null;
}) {
    return (
        <>
            <h1>Shop</h1>
            <div className="shop">
                {products &&
                    products.map((item: cartData) =>
                        createItem(item, addToCart),
                    )}
            </div>
        </>
    );
}
