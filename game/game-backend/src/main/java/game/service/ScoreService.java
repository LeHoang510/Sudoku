package game.service;

import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import game.model.Score;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@Service
public class ScoreService {
    private File file = Paths.get("src/main/resources/data/leaderboard.json").toFile();
    private ObjectMapper mapper=new ObjectMapper();
    private ObjectWriter writer= mapper.writer(new DefaultPrettyPrinter());
    public List<Score> getLeaderboard() {
        try {
            return Arrays.asList(mapper.readValue(file,Score[].class));
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
    public Score addScore(Score score){
        try {
            List<Score> leaderboard = new ArrayList<>(Arrays.asList(mapper.readValue(file,Score[].class)));
            if(leaderboard.size()<5){
                leaderboard.add(score);
            }else{
                Collections.sort(leaderboard);
                leaderboard.set(0, score);
            }
            writer.writeValue(file, leaderboard);
            return score;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
