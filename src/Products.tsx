import Item from "./Item.tsx";
import type { cartData, inputEventVoid, cartQtyUpdateVoid } from "./types.tsx";

function createItem(
    item: cartData,
    cartAction: inputEventVoid,
    buttonDescription: string = "Add To Cart",
    onQtyChange: cartQtyUpdateVoid = () => {},
    quantity: number = 0,
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
