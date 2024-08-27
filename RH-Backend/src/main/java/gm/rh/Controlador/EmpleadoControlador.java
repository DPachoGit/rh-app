package gm.rh.Controlador;

import gm.rh.DTOs.AsistenciaDTO;
import gm.rh.DTOs.EvaluacionesDTO;
import gm.rh.DTOs.EmpleadoConDetallesDTO;
import gm.rh.DTOs.EmpleadoDTO;
import gm.rh.modelo.Asistencias;
import gm.rh.modelo.Empleado;
import gm.rh.modelo.Evaluaciones;
import gm.rh.servicio.IEmpleadoServicio;
import gm.rh.servicio.IAsistenciasServicio;
import gm.rh.servicio.IEvaluacionServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("rh-app")
@CrossOrigin(value = "http://127.0.0.1:3000")
public class EmpleadoControlador {

    private static final Logger logger = LoggerFactory.getLogger(EmpleadoControlador.class);

    @Autowired
    private IEmpleadoServicio empleadoServicio;

    @Autowired
    private IAsistenciasServicio asistenciasServicio;

    @Autowired
    private IEvaluacionServicio evaluacionServicio;

    // Método GET para mostar los empleados
    @GetMapping("/empleados")
    public List<EmpleadoDTO> obtenerEmpleados(){
        var empleados = empleadoServicio.listarEmpleados();
        empleados.forEach(empleado -> logger.info(empleado.toString()));

        // Convertir a DTO
        return empleados.stream()
                .map(empleado -> new EmpleadoDTO(
                        empleado.getId(),
                        empleado.getNombre(),
                        empleado.getApellido(),
                        empleado.getPuesto(),
                        empleado.getSueldo()))
                .collect(Collectors.toList());
    }

    // Crear un nuevo empleado
    @PostMapping("/empleados")
    public EmpleadoDTO crearEmpleado(@RequestBody EmpleadoDTO empleadoDTO) {
        Empleado empleado = new Empleado(
                null, // El ID se genera automáticamente
                empleadoDTO.getNombre(),
                empleadoDTO.getApellido(),
                empleadoDTO.getPuesto(),
                empleadoDTO.getSueldo()
        );
        empleado = empleadoServicio.guardarEmpleado(empleado);
        return new EmpleadoDTO(
                empleado.getId(),
                empleado.getNombre(),
                empleado.getApellido(),
                empleado.getPuesto(),
                empleado.getSueldo()
        );
    }

    // Modificar un empleado existente
    @PutMapping("/empleados/{idEmpleado}")
    public EmpleadoDTO modificarEmpleado(@PathVariable Integer idEmpleado, @RequestBody EmpleadoDTO empleadoDTO) {
        Empleado empleadoExistente = empleadoServicio.buscarEmpleadoPorId(idEmpleado);
        if (empleadoExistente == null) {
            throw new RuntimeException("Empleado no encontrado");
        }

        // Actualizar los datos del empleado
        empleadoExistente.setNombre(empleadoDTO.getNombre());
        empleadoExistente.setApellido(empleadoDTO.getApellido());
        empleadoExistente.setPuesto(empleadoDTO.getPuesto());
        empleadoExistente.setSueldo(empleadoDTO.getSueldo());

        // Guardar los cambios
        Empleado empleadoModificado = empleadoServicio.guardarEmpleado(empleadoExistente);

        return new EmpleadoDTO(
                empleadoModificado.getId(),
                empleadoModificado.getNombre(),
                empleadoModificado.getApellido(),
                empleadoModificado.getPuesto(),
                empleadoModificado.getSueldo()
        );
    }

    // Eliminar un empleado
    @DeleteMapping("/empleados/{idEmpleado}")
    public void eliminarEmpleado(@PathVariable Integer idEmpleado) {
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(idEmpleado);
        if (empleado == null) {
            throw new RuntimeException("Empleado no encontrado");
        }
        empleadoServicio.eliminarEmpleado(empleado);
    }

    // Método GET para mostar las asistencias y evaluaciones de un empleado
    @GetMapping("/empleados/{idEmpleado}")
    public EmpleadoConDetallesDTO obtenerEmpleadoDetalles(@PathVariable Integer idEmpleado) {
        // Obtener el empleado
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(idEmpleado);
        if (empleado == null) {
            // Aquí podrías lanzar una excepción personalizada o manejar el error según tu preferencia.
            throw new RuntimeException("Empleado no encontrado");
        }

        // Obtener las asistencias del empleado y convertirlas a DTO
        List<AsistenciaDTO> asistenciasDTO = asistenciasServicio.listarAsistenciasPorEmpleado(empleado).stream()
                .map(asistencia -> new AsistenciaDTO(
                        asistencia.getId(),
                        asistencia.getFecha(),
                        asistencia.getHoraEntrada(),
                        asistencia.getHoraSalida(),
                        asistencia.getEstado()))
                .collect(Collectors.toList());

        // Obtener las evaluaciones del empleado y convertirlas a DTO
        List<EvaluacionesDTO> evaluacionesDTO = evaluacionServicio.listarEvaluacionesPorEmpleado(empleado).stream()
                .map(evaluacion -> new EvaluacionesDTO(
                        evaluacion.getId(),
                        evaluacion.getFechaEvaluacion(),
                        evaluacion.getEvaluador(),
                        evaluacion.getPuntuacion(),
                        evaluacion.getComentarios()))
                .collect(Collectors.toList());

        // Convertir Empleado a EmpleadoDTO
        EmpleadoDTO empleadoDTO = new EmpleadoDTO(
                empleado.getId(),
                empleado.getNombre(),
                empleado.getApellido(),
                empleado.getPuesto(),
                empleado.getSueldo());

        // Construir la respuesta con EmpleadoConDetallesDTO
        return new EmpleadoConDetallesDTO(empleadoDTO, asistenciasDTO, evaluacionesDTO);
    }

    // Método POST para agregar una asistencia
    @PostMapping("/empleados/{idEmpleado}/asistencias")
    public AsistenciaDTO agregarAsistencia(@PathVariable Integer idEmpleado, @RequestBody AsistenciaDTO asistenciaDTO) {
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(idEmpleado);
        if (empleado == null) {
            throw new RuntimeException("Empleado no encontrado");
        }

        // Crear nueva asistencia y guardarla
        Asistencias nuevaAsistencia = new Asistencias(
                null, // ID se genera automáticamente
                empleado,
                asistenciaDTO.getFecha(),
                asistenciaDTO.getHoraEntrada(),
                asistenciaDTO.getHoraSalida(),
                asistenciaDTO.getEstado()
        );
        asistenciasServicio.guardarAsistencia(nuevaAsistencia);

        // Convertir a DTO y devolver como respuesta
        return new AsistenciaDTO(
                nuevaAsistencia.getId(),
                nuevaAsistencia.getFecha(),
                nuevaAsistencia.getHoraEntrada(),
                nuevaAsistencia.getHoraSalida(),
                nuevaAsistencia.getEstado()
        );
    }

    // Método POST para agregar una evaluación
    @PostMapping("/empleados/{idEmpleado}/evaluaciones")
    public EvaluacionesDTO agregarEvaluacion(@PathVariable Integer idEmpleado, @RequestBody EvaluacionesDTO evaluacionDTO) {
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(idEmpleado);
        if (empleado == null) {
            throw new RuntimeException("Empleado no encontrado");
        }

        // Crear nueva evaluación y guardarla
        Evaluaciones nuevaEvaluacion = new Evaluaciones(
                null, // ID se genera automáticamente
                empleado,
                evaluacionDTO.getFechaEvaluacion(),
                evaluacionDTO.getEvaluador(),
                evaluacionDTO.getPuntuacion(),
                evaluacionDTO.getComentarios()
        );
        evaluacionServicio.guardarEvaluacion(nuevaEvaluacion);

        // Convertir a DTO y devolver como respuesta
        return new EvaluacionesDTO(
                nuevaEvaluacion.getId(),
                nuevaEvaluacion.getFechaEvaluacion(),
                nuevaEvaluacion.getEvaluador(),
                nuevaEvaluacion.getPuntuacion(),
                nuevaEvaluacion.getComentarios()
        );
    }



}