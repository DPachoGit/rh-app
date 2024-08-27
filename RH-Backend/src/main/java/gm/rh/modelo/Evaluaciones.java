package gm.rh.modelo;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Evaluaciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_personal_eval", nullable = false)
    private Empleado empleado;

    private LocalDate fechaEvaluacion;

    @Column(length = 45, nullable = false)
    private String evaluador;

    private Integer puntuacion;

    @Column(length = 250)
    private String comentarios;
}