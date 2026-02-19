import { Link } from "react-router";
import styles from "./Header.module.css";

export default function Header({ totalItems = 0 }: { totalItems?: number }) {
    return (
        <header className={styles.header}>
            <ul className={styles.ul}>
                <Link className={styles.primary} to="/">
                    <li className={styles.li}>Home</li>
                </Link>
                <Link className={styles.primary} to="/shop">
                    <li className={styles.li}>Shop</li>
                </Link>
                <Link className={styles.primary} to="/cart">
                    <li className={styles.li}>Cart ({totalItems})</li>
                </Link>
            </ul>
            <hr />
        </header>
    );
}
