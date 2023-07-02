import { Fragment, useContext } from 'react';
import { ReactComponent as Logo } from '../../assets/RENEGVDE.svg'
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss'

const Navigation = () => {
    const { user } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <div>
                        <Logo className='logo' />
                    </div>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                    {user ? (
                        <Link className='nav-link' to='/' onClick={signOutUser}>SIGN OUT</Link>
                    ) : (
                        <Link className='nav-link' to='/auth'>SIGN IN</Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation