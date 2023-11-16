import React, { useState } from 'react';
import HeaderLog from '../images/Logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

const Login = ({ setUserEmail, setRegInfo, handleLogin, setInfoTooltipOpen }) => {


    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        auth.authorize(formValue.email, formValue.password)
            .then((data) => {      
                if (data.token) {
                    navigate('/main', { replace: true });
                    setUserEmail(formValue)
                    setFormValue({ email: '', password: '' });
                    handleLogin();
                }
            })
            .catch((err) => {
                setRegInfo({success: false})
                setInfoTooltipOpen(true)
            });
    }


    return (
        <>
            <div className="header">
                <img className="header__logo" src={HeaderLog} alt="Места в России" />
                <div className='header__login-container'>
                    <Link to="/sign-up" className='header__button'>Регистрация</Link>
                </div>
            </div>
            <div className='container'>
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="form__title">Вход</h2>
                    <input className="form__email" name="email" type="email" required placeholder='Email' value={formValue.email} onChange={handleChange} />
                    <input className="form__password" name="password" type="password" required placeholder='Пароль' value={formValue.password} onChange={handleChange} />
                    <div className="form__button-container form__button-container_margin">
                        <button className="form__button" type='submit' >Войти</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;