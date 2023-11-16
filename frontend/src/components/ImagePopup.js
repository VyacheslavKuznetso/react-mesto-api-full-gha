import React from 'react';

function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup window-img ${card ? 'popup_opened' : ''}`}>
          <div className="popup__img-conteiner">
            <button className="popup__close popup__close_window-img" type="button" onClick={onClose}></button>
            <img className="popup__picture" src={card ? card.link : ''} alt={card ? card.name : ''} />
            <h2 className="popup__text">{card ? card.name : ''}</h2>
          </div>
        </div>
      );
}

export default ImagePopup;
