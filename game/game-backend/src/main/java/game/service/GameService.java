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
            final Grid easy = mapper.readValue(getGridFile("easy"), Grid.class);
            final Grid medium = mapper.readValue(getGridFile("medium"), Grid.class);
            final Grid hard = mapper.readValue(getGridFile("hard"), Grid.class);
            final Grid veryhard = mapper.readValue(getGridFile("veryhard"), Grid.class);
            final Grid insane = mapper.readValue(getGridFile("insane"), Grid.class);
            final Grid inhuman = mapper.readValue(getGridFile("inhuman"), Grid.class);
            grids.add(easy);
            grids.add(medium);
            grids.add(hard);
            grids.add(veryhard);
            grids.add(insane);
            grids.add(inhuman);
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
            return Arrays.asList(mapper.readValue(getLeaderboardFile(level), Score[].class));
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
            final Score[] leaderboard = mapper.readValue(getLeaderboardFile(level), Score[].class);
            final int length = leaderboard.length;
            /*
            for (Score value : leaderboard) {
                if (score.getName().equals(value.getName())) {
                    if (score.getScore() <= value.getScore()) {
                        value.setScore(score.getScore());
                        writer.writeValue(getLeaderboardFile(level), leaderboard);
                    }
                    return score;
                }
            }

             */
            final Score[] leaderboard_match = Arrays.stream(leaderboard)
                    .filter(value -> score.getName().equals(value.getName()))
                    .toArray(Score[]::new);
            if (leaderboard_match.length > 0) {
                if (score.getScore() <= leaderboard_match[0].getScore()) {
                    leaderboard_match[0].setScore(score.getScore());
                    writer.writeValue(getLeaderboardFile(level), leaderboard);
                }
                return score;
            }
            if (length < 5) {
                final Score[] scores = new Score[length + 1];
                System.arraycopy(leaderboard, 0, scores, 0, length);
                scores[length] = score;
                writer.writeValue(getLeaderboardFile(level), scores);
            } else {
                Arrays.sort(leaderboard);
                if (score.getScore() < leaderboard[0].getScore()) {
                    leaderboard[0] = score;
                    writer.writeValue(getLeaderboardFile(level), leaderboard);
                }
            }
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
