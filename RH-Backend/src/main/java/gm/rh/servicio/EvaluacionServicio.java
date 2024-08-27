package gm.rh.servicio;

import gm.rh.modelo.Empleado;
import gm.rh.modelo.Evaluaciones;
import gm.rh.repositorio.EvaluacionRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EvaluacionServicio implements IEvaluacionServicio {

    @Autowired
    private EvaluacionRepositorio evaluacionRepositorio;

    @Override
    public List<Evaluaciones> listarEvaluacionesPorEmpleado(Empleado empleado) {
        // Usar el repositorio para obtener las evaluaciones de un empleado
        return evaluacionRepositorio.findByEmpleado(empleado);
    }

    @Override
    @Transactional
    public void eliminarEvaluacionesPorEmpleado(Empleado empleado) {
        // Usar el repositorio para eliminar todas las evaluaciones de un empleado
        evaluacionRepositorio.deleteByEmpleado(empleado);
    }

    @Override
    public void guardarEvaluacion(Evaluaciones evaluacion) {
        evaluacionRepositorio.save(evaluacion);
    }
}