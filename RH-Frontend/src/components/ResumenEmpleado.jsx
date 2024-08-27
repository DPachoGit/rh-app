import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function ResumenEmpleado() {
  const { idEmpleado } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/rh-app/empleados/${idEmpleado}`)
      .then(response => response.json())
      .then(data => setEmpleado(data))
      .catch(error => console.error('Error fetching empleado details:', error));
  }, [idEmpleado]);

  const handleNuevaAsistencia = () => {
    navigate(`/agregar-asistencia/${idEmpleado}`);
  };

  const handleNuevaEvaluacion = () => {
    navigate(`/agregar-evaluacion/${idEmpleado}`);
  };

  if (!empleado) return <div className="min-h-screen flex items-center justify-center text-blue-700">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Detalles del Empleado: <span className="text-3xl font-semibold text-gray-800">{empleado.empleado.nombre} {empleado.empleado.apellido}</span></h1>
        
        {/* Disposición en columnas para las tablas */}
        <div className="flex space-x-4">
          {/* Tabla de Asistencias */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Asistencias</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-3 px-6 text-left">Fecha</th>
                    <th className="py-3 px-6 text-left">Hora Entrada</th>
                    <th className="py-3 px-6 text-left">Hora Salida</th>
                    <th className="py-3 px-6 text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {empleado.asistencias.map(asistencia => (
                    <tr key={asistencia.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                      <td className="py-3 px-6 text-gray-700">{asistencia.fecha}</td>
                      <td className="py-3 px-6 text-gray-700">{asistencia.horaEntrada}</td>
                      <td className="py-3 px-6 text-gray-700">{asistencia.horaSalida}</td>
                      <td className="py-3 px-6 text-gray-700">{asistencia.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                onClick={handleNuevaAsistencia}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
              >
                Agregar Asistencia
              </button>
            </div>
          </div>

          {/* Tabla de Evaluaciones */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Evaluaciones</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-3 px-6 text-left">Fecha</th>
                    <th className="py-3 px-6 text-left">Puntuación</th>
                    <th className="py-3 px-6 text-left">Comentarios</th>
                  </tr>
                </thead>
                <tbody>
                  {empleado.evaluaciones.map(evaluacion => (
                    <tr key={evaluacion.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                      <td className="py-3 px-6 text-gray-700">{evaluacion.fechaEvaluacion}</td>
                      <td className="py-3 px-6 text-gray-700">{evaluacion.puntuacion}</td>
                      <td className="py-3 px-6 text-gray-700">{evaluacion.comentarios}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                onClick={handleNuevaEvaluacion}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
              >
                Agregar Evaluación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumenEmpleado;
