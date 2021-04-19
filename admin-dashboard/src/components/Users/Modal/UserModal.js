import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '../../Modal.css';

const UserModal = ({ isShowing, hide, user, onSubmit }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const handleChange = function (event) {
    let { name, value } = event.currentTarget;
    if (name === 'isAdmin') {
      value = event.currentTarget.checked;
    }
    let provisionalUser = { ...currentUser }; // shallow copy
    provisionalUser[name] = value;
    setCurrentUser(provisionalUser);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4 className="text-2xl font-bold">
                    Modifier les informations de l'utilisateur :{' '}
                    {user.firstName}
                  </h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    className="flex flex-col space-y-2"
                    onSubmit={event => {
                      onSubmit(event, currentUser);
                      hide();
                    }}
                  >
                    <div>
                      <label className="font-semibold block">Prénom</label>
                      <input
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        type="text"
                        name="firstName"
                        value={currentUser.firstName}
                        onChange={event => handleChange(event)}
                      />
                    </div>
                    <div>
                      <label className="font-semibold block">Nom</label>
                      <input
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        type="text"
                        name="lastName"
                        value={currentUser.lastName}
                        onChange={event => handleChange(event)}
                      />
                    </div>
                    <div>
                      <label className="font-semibold block">Ville</label>
                      <input
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        type="text"
                        name="city"
                        value={currentUser.city}
                        onChange={event => handleChange(event)}
                      />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="isAdmin"
                        value={currentUser.isAdmin}
                        className="mr-2"
                        onChange={event => handleChange(event)}
                        defaultChecked={currentUser.isAdmin}
                      />
                      <label>Administrateur</label>
                    </div>
                    <button className="p-3 text-white bg-blue-500 rounded hover:bg-blue-600">
                      Confirmer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};
export default UserModal;
