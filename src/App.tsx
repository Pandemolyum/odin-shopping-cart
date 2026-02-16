import "./App.css";
import Header from "./Header.tsx";

function App() {
    return (
        <>
            <Header />
            <h1>Home Page</h1>
            <p>Welcome to the shop!</p>
            <p>
                Please take a look at the <a href="shop">Shop</a> page and add
                items to your cart.
            </p>
            <p>
                If you are a compulsive shopper this is the perfect place toi
                manage your impulses as you cannot checkout your items.
            </p>
        </>
    );
}

export default App;
