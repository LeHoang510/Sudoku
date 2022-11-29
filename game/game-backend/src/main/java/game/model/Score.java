package game.model;


import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Score implements Comparable<Score>{
    private String name;
    private int score;

    @Override
    public int compareTo(Score score) {
        return score.score-this.score;
    }
}
