import Button, { ButtonTypes } from "components/button/button.component";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.reducer";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <div className="name">{name}</div>
        <div className="price">{price}$</div>
      </div>
      <Button buttonType={ButtonTypes.default} onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};
export default ProductCard;
