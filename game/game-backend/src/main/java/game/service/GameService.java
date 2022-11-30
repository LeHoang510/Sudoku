package game.service;

import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import game.model.Grid;
import game.model.Score;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

@Getter
@Setter
@Service
public class GameService {
    private ObjectMapper mapper = new ObjectMapper();
    private ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());

    public File getGridFile(final String level) {
        final String source = "src/main/resources/data/grid/" + level + ".json";
        return Paths.get(source).toFile();
    }
    public File getLeaderboardFile(final String level) {
        final String source = "src/main/resources/data/leaderboard/" + level + ".json";
        return Paths.get(source).toFile();
    }

    public List<Grid> getGrids() {
        final List<Grid> grids = new ArrayList<>();
        try {
            System.out.println("-get easy");
            final Grid easy = mapper.readValue(getGridFile("easy"), Grid.class);
            System.out.println("-get medium");
            final Grid medium = mapper.readValue(getGridFile("medium"), Grid.class);
            System.out.println("-get hard");
            final Grid hard = mapper.readValue(getGridFile("hard"), Grid.class);
            System.out.println("-get veryhard");
            final Grid veryhard = mapper.readValue(getGridFile("veryhard"), Grid.class);
            System.out.println("-get insane");
            final Grid insane = mapper.readValue(getGridFile("insane"), Grid.class);
            System.out.println("-get inhuman");
            final Grid inhuman = mapper.readValue(getGridFile("inhuman"), Grid.class);
            System.out.println("=>add to a list");
            grids.add(easy);
            grids.add(medium);
            grids.add(hard);
            grids.add(veryhard);
            grids.add(insane);
            grids.add(inhuman);
            System.out.println("=>return the list\n\n\n\n");
            return grids;
        } catch (RuntimeException e) {
            e.printStackTrace();
            return null;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public List<Score> getLeaderboard(final String level) {
        try {
            final List<Score> leaderboard = Arrays.asList(mapper.readValue(getLeaderboardFile(level), Score[].class));
            System.out.println("=>return the list\n\n\n\n");
            return leaderboard;
        } catch (RuntimeException e) {
            e.printStackTrace();
            return null;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public Score addScore(final String level, final Score score) {
        try {
            System.out.println("=>get leaderboard");
            final Score[] leaderboard = mapper.readValue(getLeaderboardFile(level), Score[].class);
            System.out.println("=>adding score");
            final int length = leaderboard.length;
            if (length < 5) {
                final Score[] scores = new Score[length + 1];
                System.arraycopy(leaderboard, 0, scores, 0, length);
                scores[length] = score;
                System.out.println("=>update leaderboard");
                writer.writeValue(getLeaderboardFile(level), scores);
                System.out.println("=>success");
            } else {
                Arrays.sort(leaderboard);
                if (score.getScore() < leaderboard[0].getScore()) {
                    leaderboard[0] = score;
                    System.out.println("=>update leaderboard");
                    writer.writeValue(getLeaderboardFile(level), leaderboard);
                    System.out.println("=>success");
                } else {
                    System.out.println("=>fail");
                }
            }
            System.out.println("=>return score\n\n\n\n");
            return score;
        } catch (RuntimeException e) {
            e.printStackTrace();
            return null;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

}
