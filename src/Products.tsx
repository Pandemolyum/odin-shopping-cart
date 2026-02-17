import Item from "./Item.tsx";

const RAW_PRODUCTS = [
    { id: 1, name: "Apple", price: 120, quantity: 0, imgUrl: null },
    { id: 2, name: "Banana", price: 80, quantity: 0, imgUrl: null },
    { id: 3, name: "Orange", price: 45, quantity: 0, imgUrl: null },
];

function createItem(item, addToCart) {
    return (
        <Item
            key={item.id}
            productId={item.id}
            name={item.name}
            imgUrl={item.imgUrl}
            price={item.price}
            addToCart={addToCart}
        />
    );
}

export { createItem, RAW_PRODUCTS };
