// EvaluacionDTO.java
package gm.rh.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionesDTO {
    private Integer id;
    private LocalDate fechaEvaluacion;
    private String evaluador;
    private int puntuacion;
    private String comentarios;
}