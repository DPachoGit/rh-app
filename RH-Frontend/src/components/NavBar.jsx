import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link 
            to="/" 
            className="text-white text-lg font-semibold font-sans hover:text-blue-300 transition duration-300 ease-in-out"
          >
            Volver a Lista de Empleados
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;