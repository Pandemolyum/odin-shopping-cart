export default function Header({ totalItems = 0 }: { totalItems?: number }) {
    return (
        <header>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="shop">Shop</a>
                </li>
                <li>
                    <a href="cart">Cart {totalItems}</a>
                </li>
            </ul>
        </header>
    );
}
