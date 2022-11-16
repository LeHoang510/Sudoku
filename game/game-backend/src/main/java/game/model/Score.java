package game.model;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int rank;
    private String name;
    private int score;
}
