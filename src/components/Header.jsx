import React from 'react';
import { Link } from 'react-router-dom';
import "../css/header.css";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Form</Link>
          </li>
          <li>
            <Link to="/table">Table</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};