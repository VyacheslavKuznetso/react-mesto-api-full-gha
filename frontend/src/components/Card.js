import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? '' : 'element__delete-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_filled' : ''}`
  );

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  


  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__signature">
        <h2 className="element__text-photo">{card.name}</h2>
        <div className="element__config-licke">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="element__number">{card.likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
    </article>
  );
}

export default Card;
