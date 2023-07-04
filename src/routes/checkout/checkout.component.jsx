import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import CartItem from '../../components/cart-item/cart-item.component'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.styles.scss'

const Checkout = () => {
    const { cartItems, total } = useContext(CartContext)

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} item={item} />
            ))}
            <div className='total'>
                <span>TOTAL: ${total}</span>
            </div>
            {/* <div className='test-warning'>
                *Please use the following test credit card for payments*
                <br />
                4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
            </div>
            <StripeCheckoutButton price={total} /> */}
        </div>
    )
}
export default Checkout