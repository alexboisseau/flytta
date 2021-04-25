import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '../Modal.css';

const CategoryModal = function ({
  isShowing,
  hide,
  category,
  onSubmit,
  create = false,
}) {
  const [currentCategory, setCurrentCategory] = useState(category);

  const handleChange = function (event) {
    let { name, value } = event.currentTarget;
    let provisionalCategory = { ...currentCategory }; // shallow copy
    provisionalCategory[name] = value;
    setCurrentCategory(provisionalCategory);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  {create ? (
                    <h4 className="text-2xl font-bold">
                      Création d'une nouvelle catégorie
                    </h4>
                  ) : (
                    <h4 className="text-2xl font-bold">
                      Modifier les informations de la catégorie :
                      {' ' + currentCategory.name}
                    </h4>
                  )}

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
                    onSubmit={() => {
                      onSubmit(currentCategory);
                      hide();
                    }}
                  >
                    <div>
                      <label className="font-semibold block">Nom</label>
                      <input
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        type="text"
                        name="name"
                        value={currentCategory.name}
                        onChange={event => handleChange(event)}
                      />
                    </div>
                    <div>
                      <label className="font-semibold block">Couleur</label>
                      <input
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        type="text"
                        name="color"
                        value={currentCategory.color}
                        onChange={event => handleChange(event)}
                      />
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
export default CategoryModal;
