package gm.rh.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoConDetallesDTO {
    private EmpleadoDTO empleado;
    private List<AsistenciaDTO> asistencias;
    private List<EvaluacionesDTO> evaluaciones;
}
