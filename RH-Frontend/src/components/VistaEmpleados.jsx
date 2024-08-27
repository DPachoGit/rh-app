import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function VistaEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/rh-app/empleados')
      .then(response => response.json())
      .then(data => setEmpleados(data))
      .catch(error => console.error(error));
  }, []);

  const handleModificar = (id) => {
    navigate(`/modificar-empleado/${id}`);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      fetch(`http://localhost:8080/rh-app/empleados/${id}`, {
        method: 'DELETE',
      })
        .then(() => setEmpleados(empleados.filter(e => e.id !== id)))
        .catch(error => console.error(error));
    }
  };

  const handleVerDetalles = (id) => {
    navigate(`/empleado/${id}`);
  };

  const handleCrearNuevo = () => {
    navigate('/crear-empleado');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Lista de Empleados</h2>

        {/* Tabla de empleados */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Apellido</th>
                <th className="py-3 px-6 text-left">Puesto</th>
                <th className="py-3 px-6 text-left">Sueldo (€)</th>
                <th className="py-3 px-6 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {empleados.map(empleado => (
                <tr key={empleado.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="py-3 px-6 text-gray-700">{empleado.nombre}</td>
                  <td className="py-3 px-6 text-gray-700">{empleado.apellido}</td>
                  <td className="py-3 px-6 text-gray-700">{empleado.puesto}</td>
                  <td className="py-3 px-6 text-gray-700">{empleado.sueldo} €</td>
                  <td className="py-3 px-6">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleVerDetalles(empleado.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Ver Detalles
                      </button>
                      <button
                        onClick={() => handleModificar(empleado.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Modificar
                      </button>
                      <button
                        onClick={() => handleEliminar(empleado.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            onClick={handleCrearNuevo}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Crear Nuevo Empleado
          </button>
        </div>
      </div>
    </div>
  );
}

export default VistaEmpleados;
