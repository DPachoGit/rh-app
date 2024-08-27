import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AgregarAsistencia() {
  const { empleadoId } = useParams();
  const [asistencia, setAsistencia] = useState({ fecha: '', horaEntrada: '', horaSalida: '', estado: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAsistencia({ ...asistencia, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/rh-app/empleados/${empleadoId}/asistencias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(asistencia),
    })
    .then(() => navigate(-1)) // Vuelve a la ruta anterior
    .catch(error => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Agregar Nueva Asistencia</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Fecha:
              <input
                type="date"
                name="fecha"
                value={asistencia.fecha}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Hora Entrada:
              <input
                type="time"
                name="horaEntrada"
                value={asistencia.horaEntrada}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Hora Salida:
              <input
                type="time"
                name="horaSalida"
                value={asistencia.horaSalida}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Estado:
              <input
                type="text"
                name="estado"
                value={asistencia.estado}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarAsistencia;
