import React from "react";
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({ isOpen, onClose, onUpdateAddCard }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAddCard({
            name,
            link
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    return (
        <PopupWithForm name="add-form" isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} nameId="addForm" formId="userImg" title="Новое место" submitButtonLabel="Создать" >
            <div className="popup__input-container">
                <input id="text_img" required minLength={2} maxLength={30} className='popup__form-input popup__form-input_text_img' placeholder="Название" type="text" name="commentImg" value={name} onChange={handleNameChange} />
                <span id="text_img-error" className='popup__message'></span>
            </div>
            <div className='popup__input-container'>
                <input id="url" required className='popup__form-input popup__form-input_src_img' placeholder="Ссылка на картинку" type="url" name="linkImg" value={link} onChange={handleLinkChange} />
                <span id="url-error" className='popup__message'></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;