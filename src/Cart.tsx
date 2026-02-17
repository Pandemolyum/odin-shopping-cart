import { createItem } from "./Products.tsx";

export default function Cart({ cart, removeFromCart }) {
    const children = cart.map((item) => (
        <div className="item" data-product-id={item.id}>
            <h3>{item.name}</h3>
            <img src={item.imgUrl} alt="" />
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button className="qty" onClick={removeFromCart}>
                Remove From Cart
            </button>
        </div>
    ));

    return (
        <>
            <h1>Cart Page</h1>
            <div className="shop">{children}</div>
        </>
    );
}
