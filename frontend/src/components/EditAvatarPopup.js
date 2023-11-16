import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'




function EditAvatarPopup(props) {

    const currentUser = React.useContext(CurrentUserContext);


    const avatarRef = React.useRef();

    React.useEffect(() => {
        if (currentUser) {
            avatarRef.current.value = currentUser.avatar;
        }
    }, [currentUser, props.isOpen]);


    function handleSubmit(e) {
        e.preventDefault();

        const avatar = avatarRef.current.value;

        props.onUpdateAvatar({
            avatar: avatar
        });
    }

    return (
        <PopupWithForm name="edit-avatar" isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit} nameId="editAvatar" formId="editAvatarForm" title="Обновить аватар" submitButtonLabel="Сохранить">
            <div className='popup__input-container'>
                <input ref={avatarRef} id="url_avatar" required className='popup__form-input popup__form-input_edit_avatar' placeholder="Ссылка на аватар" type="url" name="linkAvatar" />
                <span id="url_avatar-error" className='popup__message'></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup