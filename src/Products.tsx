import Item from "./Item.tsx";

function createItem(
    item,
    cartAction,
    buttonDescription = "Add To Cart",
    onQtyChange = () => {},
    quantity = 0,
) {
    return (
        <Item
            key={item.id}
            productId={item.id}
            name={item.name}
            imgUrl={item.imgUrl}
            price={item.price}
            quantity={quantity}
            cartAction={cartAction}
            cartButtonDescription={buttonDescription}
            onQtyChange={onQtyChange}
        />
    );
}

export { createItem };
