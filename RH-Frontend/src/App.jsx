import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VistaEmpleados from './components/VistaEmpleados';
import ModificarEmpleado from './components/ModificarEmpleado';
import CrearEmpleado from './components/CrearEmpleado';
import ResumenEmpleado from './components/ResumenEmpleado';
import AgregarAsistencia from './components/AgregarAsistencia';
import AgregarEvaluacion from './components/AgregarEvaluacion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VistaEmpleados />} />
        <Route path="/modificar-empleado/:id" element={<ModificarEmpleado />} />
        <Route path="/crear-empleado" element={<CrearEmpleado />} />
        <Route path="/empleado/:idEmpleado" element={<ResumenEmpleado />} />
        <Route path="/agregar-asistencia/:empleadoId" element={<AgregarAsistencia />} />
        <Route path="/agregar-evaluacion/:empleadoId" element={<AgregarEvaluacion />} />
      </Routes>
    </Router>
  );
}

export default App;