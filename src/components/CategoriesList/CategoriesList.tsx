import React from 'react';
import {NavLink} from 'react-router-dom';
import {categories} from '../../types';

const CategoriesList = () => {
  return (
    <div>
      <div className="container p-0 mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto flex-column">
              <li className="nav-item">
                <NavLink className="nav-link" to={`/`}>All</NavLink>
              </li>
              {categories.map(category => (
                <li key={category.id} className="nav-item">
                  <NavLink className="nav-link" to={`/quotes/${category.id}`}>{category.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CategoriesList;