import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ModificarEmpleado() {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/rh-app/empleados/${id}`)
      .then(response => response.json())
      .then(data => setEmpleado(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/rh-app/empleados/${id}`, {
      method: 'PUT',
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
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Modificar Empleado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="nombre"
              value={empleado.nombre || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Apellido:</span>
            <input
              type="text"
              name="apellido"
              value={empleado.apellido || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Puesto:</span>
            <input
              type="text"
              name="puesto"
              value={empleado.puesto || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Sueldo:</span>
            <input
              type="number"
              name="sueldo"
              value={empleado.sueldo || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModificarEmpleado;