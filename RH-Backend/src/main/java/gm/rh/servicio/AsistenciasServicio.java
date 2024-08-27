package gm.rh.servicio;

import gm.rh.modelo.Asistencias;
import gm.rh.modelo.Empleado;
import gm.rh.repositorio.AsistenciasRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AsistenciasServicio implements IAsistenciasServicio {

    @Autowired
    private AsistenciasRepositorio asistenciasRepositorio;

    @Override
    public List<Asistencias> listarAsistenciasPorEmpleado(Empleado empleado) {
        // Usa el repositorio para obtener las asistencias de un empleado
        return asistenciasRepositorio.findByEmpleado(empleado);
    }

    @Override
    @Transactional
    public void eliminarAsistenciasPorEmpleado(Empleado empleado) {
        // Usa el repositorio para eliminar todas las asistencias de un empleado
        asistenciasRepositorio.deleteByEmpleado(empleado);
    }

    @Override
    public void guardarAsistencia(Asistencias asistencia) {
        asistenciasRepositorio.save(asistencia);
    }
}