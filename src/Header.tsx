import { Link } from "react-router";

export default function Header({ totalItems = 0 }: { totalItems?: number }) {
    return (
        <header>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
                <li>
                    <Link to="/cart">Cart ({totalItems})</Link>
                </li>
            </ul>
        </header>
    );
}
