package gm.rh.servicio;

import gm.rh.modelo.Asistencias;
import gm.rh.modelo.Empleado;

import java.util.List;

public interface IAsistenciasServicio {
    // Listar todas las asistencias de un empleado
    List<Asistencias> listarAsistenciasPorEmpleado(Empleado empleado);

    // Eliminar todas las asistencias de un empleado
    void eliminarAsistenciasPorEmpleado(Empleado empleado);

    // Guardar una asistencia de un empleado
    void guardarAsistencia(Asistencias asistencia);
}
