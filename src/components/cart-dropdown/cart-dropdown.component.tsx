import { useNavigate } from "react-router-dom";
import Button, { ButtonTypes } from "../button/button.component";
import CartItem from "components/cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";

import "./cart-dropdown.styles.scss";
import { useCallback } from "react";

const CartDropdown = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const navigateToCheckout = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button buttonType={ButtonTypes.default} onClick={navigateToCheckout}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};
export default CartDropdown;
