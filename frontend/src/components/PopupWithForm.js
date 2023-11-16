import React from 'react';

function PopupWithForm(props) {
  return (
    <>
      <div className={`popup ${props.nameFor} ${props.isOpen ? 'popup_opened' : ''}`} id={props.nameId} >
        <div className="popup__conteiner">
          <button className={`popup__close popup__close_${props.nameFor}`} onClick={props.onClose} type="button"></button>
          <form className="popup__form" id={props.nameId} name={`${props.formId}`} onSubmit={props.handleSubmit} >
            <h2 className="popup__form-title">{props.title}</h2>
            {props.children}
            <button className="popup__form-submit-button popup__form-submit-button_visible" type="submit" >{props.submitButtonLabel}</button>
          </form>
        </div>
      </div>
    </>
  );
}


export default PopupWithForm;

