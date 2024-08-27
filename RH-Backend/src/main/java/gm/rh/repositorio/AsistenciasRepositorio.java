package gm.rh.repositorio;

import gm.rh.modelo.Asistencias;
import gm.rh.modelo.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AsistenciasRepositorio extends JpaRepository<Asistencias, Integer> {

    // Listar todas las asistencias de un empleado
    List<Asistencias> findByEmpleado(Empleado empleado);

    // Eliminar todas las asistencias de un empleado
    void deleteByEmpleado(Empleado empleado);
}