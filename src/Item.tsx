export default function Item({
    name,
    imgUrl,
    price,
    quantity = 0,
}: {
    name: string;
    imgUrl: string;
    price: number;
    quantity?: number;
}) {
    return (
        <div className="item">
            <h3>{name}</h3>
            <img src={imgUrl} alt="" />
            <p>{price}</p>
            <div className="qty">
                <button className="qty">
                    <img src="" alt="" />
                </button>
                <input type="number" className="qty" value={quantity} />
                <button className="qty">
                    <img src="" alt="" />
                </button>
            </div>
        </div>
    );
}
