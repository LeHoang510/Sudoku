package game.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Arrays;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Grid {
    private int[][] gridElements;
    private boolean[][] constant;
    private Score[] scores;

    public void addScore(final Score score) {
        final int length = this.scores.length;
        if (length < 5) {
            final Score[] scores = new Score[length + 1];
            scores[length] = score;
            this.scores = scores;
            System.out.println("=>success");
        } else {
            Arrays.sort(scores);
            if (score.getScore() < this.scores[0].getScore()) {
                this.scores[0] = score;
                System.out.println("=>success");
            } else {
                System.out.println("=>fail");
            }
        }
    }
}
