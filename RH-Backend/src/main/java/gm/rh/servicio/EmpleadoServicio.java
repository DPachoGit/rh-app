package gm.rh.servicio;

import gm.rh.modelo.Empleado;
import gm.rh.repositorio.EmpleadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmpleadoServicio implements IEmpleadoServicio{

    @Autowired
    private EmpleadoRepositorio empleadoRepositorio;

    @Autowired
    private AsistenciasServicio asistenciasServicio;

    @Autowired
    private EvaluacionServicio evaluacionServicio;

    @Override
    public List<Empleado> listarEmpleados() {
        return empleadoRepositorio.findAll();
    }

    @Override
    public Empleado buscarEmpleadoPorId(Integer idEmpleado) {
        Empleado empleado = empleadoRepositorio.findById(idEmpleado).orElse(null);
        return empleado;
    }

    @Override
    public Empleado guardarEmpleado(Empleado empleado) {
        return empleadoRepositorio.save(empleado);
    }

    @Override
    @Transactional
    public void eliminarEmpleado(Empleado empleado) {
        // Eliminar las asistencias asociadas
        asistenciasServicio.eliminarAsistenciasPorEmpleado(empleado);

        // Eliminar las evaluaciones asociadas
        evaluacionServicio.eliminarEvaluacionesPorEmpleado(empleado);

        // Finalmente, eliminar el empleado
        empleadoRepositorio.delete(empleado);
    }
}