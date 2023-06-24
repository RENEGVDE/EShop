import { Fragment } from 'react';
import { ReactComponent as Logo } from '../../assets/RENEGVDE.svg'
import { Link, Outlet } from 'react-router-dom';

import './navigation.styles.scss'

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <div>
                        <Logo className='logo' />
                    </div>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-ling' to='/sign-in'>SIGN IN</Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation