import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchCategories } from '../../../services/Categories';
import Input from '../../Input';

import '../../Modal.css';

const EventModal = ({ isShowing, hide, event, onSubmit }) => {
  const [currentEvent, setCurrentEvent] = useState(event);
  const [categories, setCategories] = useState([]);

  const handleChange = function (event) {
    const { name, value } = event.currentTarget;
    let provisionalEvent = { ...currentEvent };
    provisionalEvent[name] = value;
    setCurrentEvent(provisionalEvent);
  };

  const getCategories = async function () {
    setCategories([]);
    fetchCategories().then(res => {
      res.forEach(c => {
        const category = { categoryId: c.id, ...c.data() };
        setCategories(categories => [...categories, category]);
      });
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4 className="text-2xl font-bold">
                    Modifier les informations de l'évènement : {event.name}
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
                      onSubmit(event, currentEvent);
                      hide();
                    }}
                  >
                    <div>
                      <Input
                        name="name"
                        type="text"
                        value={currentEvent.name}
                        onChange={handleChange}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        label="Nom de l'évènement"
                        classNameLabel="font-semibold block"
                      />
                    </div>
                    <div>
                      <Input
                        name="city"
                        type="text"
                        value={currentEvent.city}
                        onChange={handleChange}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        label="Ville"
                        classNameLabel="font-semibold block"
                      />
                    </div>
                    <div>
                      <Input
                        name="address"
                        type="text"
                        value={currentEvent.address}
                        onChange={handleChange}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        label="Adresse"
                        classNameLabel="font-semibold block"
                      />
                    </div>
                    <div>
                      <Input
                        name="maxPeople"
                        type="text"
                        value={currentEvent.maxPeople}
                        onChange={handleChange}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        label="Nombre de personnes au maximum"
                        classNameLabel="font-semibold block"
                      />
                    </div>
                    <div>
                      <Input
                        name="level"
                        type="text"
                        value={currentEvent.level}
                        onChange={handleChange}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        label="Niveau de difficulté"
                        classNameLabel="font-semibold block"
                      />
                    </div>
                    <div>
                      <Input
                        name="duration"
                        type="text"
                        value={currentEvent.duration}
                        onChange={handleChange}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        label="Durée (en minute)"
                        classNameLabel="font-semibold block"
                      />
                    </div>
                    <div>
                      <Input
                        name="startDate"
                        type="date"
                        value={currentEvent.startDate}
                        onChange={handleChange}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        label="Début"
                        classNameLabel="font-semibold block"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block">Description</label>
                      <textarea
                        className="rounded border border-gray-200 p-2 w-full my-1"
                        type="text"
                        name="description"
                        value={currentEvent.description}
                        onChange={event => handleChange(event)}
                      />
                    </div>
                    <div>
                      <label className="font-semibold block">Catégorie</label>
                      <select
                        name="categoryId"
                        onChange={event => handleChange(event)}
                        className="rounded border border-gray-200 p-2 w-full my-1"
                      >
                        {categories.map(c => (
                          <option
                            value={c.categoryId}
                            selected={
                              c.categoryId === currentEvent.categoryId
                                ? 'selected'
                                : ''
                            }
                          >
                            {c.name}
                          </option>
                        ))}
                      </select>
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
export default EventModal;
