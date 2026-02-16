export default function Header({
    cartItems: number = 0,
}: {
    cartItems?: number;
}) {
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
                    <a href="cart">Cart {number}</a>
                </li>
            </ul>
        </header>
    );
}
