import React, { useEffect, useState } from "react";
import type { inputEventVoid, cartQtyUpdateVoid } from "./types.tsx";
import styles from "./item.module.css";

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

    const formatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    const formatPrice = formatter.format(price);

    return (
        <div className={`card ${styles.card}`} data-product-id={productId}>
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.separator}>
                <img className={styles.img} src={imgUrl} alt="" />
                <div className={styles.details}>
                    <p>{formatPrice}</p>
                    <div className={styles.divqty}>
                        <button
                            className={`${styles.button} ${styles.leftButton}`}
                            onClick={handleDecrement}
                        >
                            -
                        </button>
                        <input
                            className={`qty ${styles.input}`}
                            type="number"
                            value={qty}
                            onChange={handleChange}
                        />
                        <button
                            className={`${styles.button} ${styles.rightButton}`}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                    <button className={styles.cartAction} onClick={cartAction}>
                        {cartButtonDescription}
                    </button>
                </div>
            </div>
        </div>
    );
}
