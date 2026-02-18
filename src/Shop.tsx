import { createItem } from "./Products.tsx";

export default function Shop({ addToCart, products }) {
    return (
        <>
            <h1>Shop Page</h1>
            <div className="shop">
                {products.map((item) => createItem(item, addToCart))}
            </div>
        </>
    );
}
