import { Link } from "react-router";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <p>Welcome to the shop!</p>
            <p>
                Please take a look at the <Link to="/shop">Shop</Link> page and
                add items to your cart.
            </p>
            <p>
                If you are a compulsive shopper this is the perfect place to
                manage your impulses as you cannot checkout your items.
            </p>
        </>
    );
}
