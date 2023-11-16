import React from 'react';
import HeaderLog from '../images/Logo.svg'
import { AppContext } from '../contexts/CurrentUserContext'
import { useNavigate } from 'react-router-dom'

function Header() {
    const userEmail = React.useContext(AppContext);

    const history = useNavigate();

    function signOut() {
        localStorage.removeItem('jwt');
        history('/sign-in', { replace: true })
    }

    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    }



    return (
        <>
            <div className={`header__container ${isBurgerOpen ? "header__container_activ": ''}`}>
                <div className='`header__login-container  header__login-container_activ'>
                    <ul className="header__list_active">
                    <li className='header__list_link'><h1 className='header__title header__title_link'>{userEmail.email}</h1></li>
                        <li className='header__list_link'><button className='header__button header__button_link' type='button' onClick={signOut} >Выйти</button></li>
                    </ul>
                </div>
            </div>
            <header className="header">
                <img className="header__logo" src={HeaderLog} alt="Места в России" />
                <div className={`header__burger ${isBurgerOpen ? 'header__burger_active' : ''}`} onClick={toggleBurger}>
                    <span></span>
                </div>
                <div className='header__login-container header__login-container_burger'>
                    <ul className="header__list">
                        <li className='header__list_link'><h1 className='header__title header__title_link'>{userEmail.email}</h1></li>
                        <li className='header__list_link'><button className='header__button header__button_link' type='button' onClick={signOut} >Выйти</button></li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header;