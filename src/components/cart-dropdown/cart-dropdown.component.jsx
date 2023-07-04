import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/button.component'
import CartItem from 'components/cart-item/cart-item.component'
import { CartContext } from '../../context/cart.context'

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const navigateToCheckout = () => navigate('/checkout')

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
            </div>
            <Button buttonType='inverted' onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown