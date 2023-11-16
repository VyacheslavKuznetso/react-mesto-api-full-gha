import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderLog from '../images/Logo.svg';
import * as auth from '../utils/auth';

const Register = ({ setRegInfo, setInfoTooltipOpen }) => {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(formValue.email, formValue.password)
            .then((data) => {
                if (data) {
                    setRegInfo({ success: true })
                    setInfoTooltipOpen(true)
                    setFormValue({ email: '', password: '' })
                    navigate('/sign-in', { replace: true });
                }
            })
            .catch((err) => {
                setRegInfo({ success: false })
                setInfoTooltipOpen(true)
            });

    }

    return (
        <div className='content'>
            <div className="header">
                <img className="header__logo" src={HeaderLog} alt="Места в России" />
                <div className='header__login-container'>
                    <Link to="/sign-in" className='header__button'>Войти</Link>
                </div>
            </div>
            <div className='container'>
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="form__title">Регистрация</h2>
                    <input className="form__email" name="email" type="email" required placeholder='Email' value={formValue.email} onChange={handleChange} />
                    <input className="form__password" name="password" type="password" required placeholder='Пароль' value={formValue.password} onChange={handleChange} />
                    <div className="form__button-container">
                        <button className="form__button" onSubmit={handleSubmit} type="submit">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
            <div className="message">
                <p className='message__text'>Уже зарегистрированы? <Link to="/sign-in" className="message__redirect">Войти</Link></p>
            </div>
        </div>
    )
}

export default Register;