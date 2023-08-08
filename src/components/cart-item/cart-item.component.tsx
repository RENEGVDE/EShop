import { FC, memo } from "react";
import { IItem } from "../../models/IItem";

import "./cart-item.styles.scss";

interface ICartItemProps {
  item: IItem;
}

const CartItem: FC<ICartItemProps> = memo(({ item }) => {
  const { name, imageUrl, price, quantity } = item;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
});
export default CartItem;
