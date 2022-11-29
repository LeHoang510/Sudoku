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

@Getter
@Setter
@Service
public class GameService {
    private ObjectMapper mapper = new ObjectMapper();
    private ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());

    public File getLevelFile(final String level) {
        final String source = "src/main/resources/data/grid/" + level + ".json";
        return Paths.get(source).toFile();
    }

    public List<Grid> getGrids() {
        final List<Grid> grids = new ArrayList<>();
        try {
            System.out.println("-get easy");
            final Grid easy = mapper.readValue(getLevelFile("easy"), Grid.class);
            System.out.println("-get medium");
            final Grid medium = mapper.readValue(getLevelFile("medium"), Grid.class);
            System.out.println("-get hard");
            final Grid hard = mapper.readValue(getLevelFile("hard"), Grid.class);
            System.out.println("-get veryhard");
            final Grid veryhard = mapper.readValue(getLevelFile("veryhard"), Grid.class);
            System.out.println("-get insane");
            final Grid insane = mapper.readValue(getLevelFile("insane"), Grid.class);
            System.out.println("-get inhuman");
            final Grid inhuman = mapper.readValue(getLevelFile("inhuman"), Grid.class);
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

    public Score addScore(final String level, final Score score) {
        try {
            System.out.println("=>get grid");
            final Grid grid = mapper.readValue(getLevelFile(level), Grid.class);
            System.out.println("=>adding score");
            grid.addScore(score);
            System.out.println("=>update grid");
            writer.writeValue(getLevelFile(level), grid);
            System.out.println("=>return score");
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
