package gm.rh.servicio;

import gm.rh.modelo.Evaluaciones;
import gm.rh.modelo.Empleado;

import java.util.List;

public interface IEvaluacionServicio {

    // Listar todas las evaluaciones de un empleado
    List<Evaluaciones> listarEvaluacionesPorEmpleado(Empleado empleado);

    // Eliminar todas las evaluaciones de un empleado
    void eliminarEvaluacionesPorEmpleado(Empleado empleado);

    // Guardar una evaluacion de un empleado
    void guardarEvaluacion(Evaluaciones evaluacion);
}