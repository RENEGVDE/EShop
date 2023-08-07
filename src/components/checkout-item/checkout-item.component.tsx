import { useDispatch } from "react-redux";
import { FC } from "react";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.reducer";
import { IItem } from "../../models/IItem";

import "./checkout-item.styles.scss";

interface CheckoutItemProps {
  item: IItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ item }) => {
  const { imageUrl, name, quantity, price } = item;
  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItemToCart(item));
  const removeItemHandler = () => dispatch(removeItemFromCart(item));
  const clearItemHandler = () => dispatch(clearItemFromCart(item));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItemHandler()}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemHandler()}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={() => clearItemHandler()}>
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;
