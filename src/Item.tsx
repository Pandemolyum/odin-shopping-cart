import React, { useEffect, useState } from "react";
import type { inputEventVoid, cartQtyUpdateVoid } from "./types.tsx";

export default function Item({
    productId,
    name,
    imgUrl,
    price,
    quantity = 0,
    cartAction,
    cartButtonDescription = "Add To Cart",
    onQtyChange = () => {},
}: {
    productId: number;
    name: string;
    imgUrl: string;
    price: number;
    quantity?: number;
    cartAction: inputEventVoid;
    cartButtonDescription: string;
    onQtyChange: cartQtyUpdateVoid;
}) {
    const [qty, setQty] = useState<number>(quantity);

    useEffect(() => {
        onQtyChange(productId, qty);
    }, [qty, productId, onQtyChange]);

    const handleIncrement = () => {
        if (qty < 100) {
            setQty(qty + 1);
        }
    };

    const handleDecrement = () => {
        if (qty > 0) {
            setQty(qty - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            const num: number = Number(e.target.value);
            if (num >= 0 && num <= 100) {
                setQty(num);
            }
        }
    };

    return (
        <div className="item" data-product-id={productId}>
            <h3>{name}</h3>
            <img src={imgUrl} alt="" />
            <p>{price}</p>
            <div className="qty">
                <button className="qty" onClick={handleDecrement}>
                    -
                </button>
                <input
                    type="number"
                    className="qty"
                    value={qty}
                    onChange={handleChange}
                />
                <button className="qty" onClick={handleIncrement}>
                    +
                </button>
            </div>
            <button className="qty" onClick={cartAction}>
                {cartButtonDescription}
            </button>
        </div>
    );
}
