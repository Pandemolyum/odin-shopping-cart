import { createItem } from "./Products.tsx";

export default function Cart({ cart }) {
    return (
        <>
            <h1>Cart Page</h1>
            <div className="shop">{cart.map((item) => createItem(item))}</div>
        </>
    );
}
