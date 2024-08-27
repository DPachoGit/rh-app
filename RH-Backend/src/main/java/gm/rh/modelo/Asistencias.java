package gm.rh.modelo;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Asistencias {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_personal_asist", nullable = false)
    private Empleado empleado;

    private LocalDate fecha;
    private LocalTime horaEntrada;
    private LocalTime horaSalida;

    @Column(length = 250)
    private String estado;
}
