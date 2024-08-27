package gm.rh.repositorio;

import gm.rh.modelo.Evaluaciones;
import gm.rh.modelo.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvaluacionRepositorio extends JpaRepository<Evaluaciones, Integer> {

    // Listar todas las evaluaciones de un empleado
    List<Evaluaciones> findByEmpleado(Empleado empleado);

    // Eliminar todas las evaluaciones de un empleado
    void deleteByEmpleado(Empleado empleado);
}