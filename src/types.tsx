interface cartData {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imgUrl: string;
}

type inputEventVoid = (a: React.MouseEvent<HTMLButtonElement>) => void;

type cartQtyUpdateVoid = (a: number, b: number) => void;

export type { cartData, inputEventVoid, cartQtyUpdateVoid };
