import React from "react";
import iconSuccess from "../images/reg-success.svg";
import iconError from "../images/reg-error.svg";

function InfoTooltip({ isOpen, success, onClose }) {

    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__conteiner-reg">
                <button className="popup__close popup__close_info-reg" type="button" onClick={onClose}></button>
                <img className="popup__conteiner-reg__image" src={success ? iconSuccess : iconError} alt={success ? "кружок с галочкой" : "кружок с крестиком"} />
            </div>
        </div>
    );
}
export default InfoTooltip;