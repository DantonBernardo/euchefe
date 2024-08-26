import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Header() {
  return (
  <header className="header">
    <div className="logo">
      <h1><Link to="/">EuChefe</Link></h1>
    </div>
    <nav>
      <ul className="nav-links">
        <li>
          <Link to="/AddReceita">Adicionar</Link>
        </li>
      </ul>
    </nav>
  </header>
  );
};