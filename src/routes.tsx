import App from "./App.tsx";
import Shop from "./Shop.tsx";
import Cart from "./Cart.tsx";
import ErrorPage from "./ErrorPage.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "shop",
        element: <Shop />,
    },
    {
        path: "cart",
        element: <Cart />,
    },
];

export default routes;
