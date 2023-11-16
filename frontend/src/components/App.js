import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext, AppContext, LoggedInContext } from '../contexts/CurrentUserContext';
import Main from './Main';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import ProtectedRouteElement from './ProtectedRoute'
import * as auth from '../utils/auth';



function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [regInfo, setRegInfo] = React.useState({ success: false });
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState(null) // <-- 
    const [cards, setCards] = React.useState([])

    const navigate = useNavigate();

    React.useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userInfo, initialCards]) => {
                    setCurrentUser(userInfo.data);
                    setCards(initialCards.cards);
                })
                .catch(console.error);
        }
    }, [loggedIn])

    React.useEffect(() => {
        handleTokenCheck();
    }, [])

    const handleTokenCheck = () => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setUserEmail(res.data)
                        setLoggedIn(true);
                        navigate("/main", { replace: true })
                    }
                })
                .catch(console.error);
        }
    }


    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true)

    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true)
    }



    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setInfoTooltipOpen(false)
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleUpdateUser = ({ name, about: description }) => {
        api.postUserInfo({ name, about: description })
            .then((userInfo) => {
                setCurrentUser(userInfo.data)
                closeAllPopups()
            })
            .catch(console.error)
    }

    const handleUpdateAvatar = ({ avatar }) => {
        api.postUserAvatar({ avatar })
            .then((userInfo) => {
                setCurrentUser(userInfo.data)
                closeAllPopups()
            })
            .catch(console.error)
    }


    const handleAddPlaceSubmit = ({ name, link }) => {
        api.addCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.error)

    }


    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.likeCard(card._id, isLiked)
            .then((newCard) => {
                // Обновляем стейт с помощью функции, которая принимает предыдущее состояние и возвращает новое состояние
                setCards((prevCards) => {
                    // Формируем новый массив на основе предыдущего состояния, подставляя в него новую карточку
                    const newCards = prevCards.map((c) => (c._id === card._id ? newCard : c));
                    return newCards;
                });
            })
            .catch(console.error);
    }

    function handleCardDelete(card) {
        // Отправляем запрос в API для удаления карточки
        api.deleteCard(card._id)
            .then(() => {
                // Обновляем стейт, используя функцию, которая принимает предыдущее состояние и возвращает новое состояние
                setCards((prevCards) => {
                    // Фильтруем массив cards, исключая удаленную карточку
                    const updatedCards = prevCards.filter((c) => c._id !== card._id);
                    return updatedCards;
                });
            })
            .catch(console.error);
    }


    const handleLogin = () => {
        setLoggedIn(true);
    }




    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <LoggedInContext.Provider value={loggedIn}>
                    <AppContext.Provider value={userEmail}>
                        <div className='page'>
                            <Routes>
                                <Route path='/' element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
                                <Route path='/main' element={<ProtectedRouteElement element={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />} />
                                <Route path='/sign-in' element={<Login setUserEmail={setUserEmail} handleLogin={handleLogin} setRegInfo={setRegInfo} setInfoTooltipOpen={setInfoTooltipOpen} />} />
                                <Route path='/sign-up' element={<Register setRegInfo={setRegInfo} setInfoTooltipOpen={setInfoTooltipOpen} />} />
                            </Routes>
                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAddCard={handleAddPlaceSubmit} />
                            <PopupWithForm name="delete" nameId="delete" formId="deleteForm" title="Вы уверены?" submitButtonLabel="Да" ></PopupWithForm>
                            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} success={regInfo.success} />
                        </div>
                    </AppContext.Provider>
                </LoggedInContext.Provider>
            </CurrentUserContext.Provider>
        </>

    );
}

export default App;
