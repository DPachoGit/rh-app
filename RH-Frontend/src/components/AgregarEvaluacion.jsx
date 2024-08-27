import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AgregarEvaluacion() {
  const { empleadoId } = useParams();
  const [evaluacion, setEvaluacion] = useState({ fechaEvaluacion: '', evaluador: '', puntuacion: '', comentarios: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvaluacion({ ...evaluacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/rh-app/empleados/${empleadoId}/evaluaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evaluacion),
    })
    .then(() => navigate(-1)) // Vuelve a la ruta anterior
    .catch(error => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Agregar Nueva Evaluación</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Fecha Evaluación:
              <input
                type="date"
                name="fechaEvaluacion"
                value={evaluacion.fechaEvaluacion}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Evaluador:
              <input
                type="text"
                name="evaluador"
                value={evaluacion.evaluador}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Puntuación:
              <input
                type="number"
                name="puntuacion"
                value={evaluacion.puntuacion}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Comentarios:
              <textarea
                name="comentarios"
                value={evaluacion.comentarios}
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

export default AgregarEvaluacion;
