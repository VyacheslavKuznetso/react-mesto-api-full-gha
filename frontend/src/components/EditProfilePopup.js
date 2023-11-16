import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');




    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);
    

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm nameFor="edit-form" isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} nameId="editForm" formId="editForm" title="Редактировать профиль" submitButtonLabel="Сохранить">
            <div className="popup__input-container">
                <input id="name" required minLength={2} maxLength={40} className="popup__form-input popup__form-input_text_name" placeholder="Name" type="text" name="userName" value={name} onChange={handleChange} />
                <span id="name-error" className="popup__message"></span>
            </div>
            <div className="popup__input-container">
                <input id="job" required minLength={2} maxLength={200} className="popup__form-input popup__form-input_text_role" placeholder="Job" type="text" name="userRole" value={description} onChange={handleChangeDescription} />
                <span id="job-error" className="popup__message"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;