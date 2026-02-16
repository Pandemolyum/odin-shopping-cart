import Item from "./Item.tsx";

const RAW_PRODUCTS = [
    { id: 1, name: "Apple", price: 120, imgUrl: "" },
    { id: 2, name: "Banana", price: 80, imgUrl: "" },
    { id: 3, name: "Orange", price: 45, imgUrl: "" },
];

const products: Array<React.ReactElement> = RAW_PRODUCTS.map((item) => (
    <Item
        key={item.id}
        name={item.name}
        imgUrl={item.imgUrl}
        price={item.price}
    />
));

export default products;
