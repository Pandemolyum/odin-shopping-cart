import React, { useState } from "react";

export default function Item({
    name,
    imgUrl,
    price,
    quantity = 0,
}: {
    name: string;
    imgUrl: string;
    price: number;
    quantity?: number;
}) {
    const [qty, setQty] = useState<number>(quantity);

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
        <div className="item">
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
            <button className="qty">Add to Cart</button>
        </div>
    );
}
