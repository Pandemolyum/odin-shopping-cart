import Header from "./Header.tsx";
import products from "./Products.tsx";

export default function Shop() {
    return (
        <>
            <Header />
            <h1>Shop Page</h1>
            <div className="shop">{products}</div>
        </>
    );
}
