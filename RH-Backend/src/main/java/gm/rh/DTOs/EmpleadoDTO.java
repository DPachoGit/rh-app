package gm.rh.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private String puesto;
    private Integer sueldo;
}
