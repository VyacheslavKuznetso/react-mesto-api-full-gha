class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    postUserInfo({name, about: description}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
            .then(this._checkResponse)
    }

    postUserAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._checkResponse)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    addCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)
    }


    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    likeCard(id, isLiked) {
        this._khabegr = isLiked ? 'DELETE' : 'PUT'
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: this._khabegr,
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }


    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://api.rumesto.nomoredomainsmonster.ru'
});

export default api;