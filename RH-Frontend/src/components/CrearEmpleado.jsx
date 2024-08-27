import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearEmpleado() {
  const [empleado, setEmpleado] = useState({ nombre: '', apellido: '', puesto: '', sueldo: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(empleado).some(field => field === '')) {
      alert('Todos los campos son obligatorios');
      return;
    }
    fetch('http://localhost:8080/rh-app/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleado),
    })
    .then(() => navigate(-1))
    .catch(error => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Crear Nuevo Empleado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="nombre"
              value={empleado.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:outline-none"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Apellido:</span>
            <input
              type="text"
              name="apellido"
              value={empleado.apellido}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:outline-none"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Puesto:</span>
            <input
              type="text"
              name="puesto"
              value={empleado.puesto}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:outline-none"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Sueldo:</span>
            <input
              type="number"
              name="sueldo"
              value={empleado.sueldo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:outline-none"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearEmpleado;
