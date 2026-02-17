import { createItem, RAW_PRODUCTS } from "./Products.tsx";

export default function Shop({ addToCart }) {
    return (
        <>
            <h1>Shop Page</h1>
            <div className="shop">
                {RAW_PRODUCTS.map((item) => createItem(item))}
            </div>
        </>
    );
}
