import { Fragment, useContext } from 'react';
import { ReactComponent as Logo } from '../../assets/RENEGVDE.svg'
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss'

const Navigation = () => {
    const { user } = useContext(UserContext)

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <div>
                        <Logo className='logo' />
                    </div>
                </Link>
                <div className='nav-links-container'>
                    {user ?
                        <Link className='nav-link' to='/' onClick={signOutUser}>SIGN OUT</Link>
                        : <Link className='nav-link' to='/auth'>SIGN IN</Link>
                    }

                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation