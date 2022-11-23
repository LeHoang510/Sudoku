package game.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import game.model.Score;
import game.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Configuration
public class MyCommandLineRunner implements CommandLineRunner {

    private final String LEADERBOARD_JSON = "/data/leaderboard.json";

    @Autowired
    private ScoreService scoreService;

    @Override
    public void run(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Score>> typeReference = new TypeReference<List<Score>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream(LEADERBOARD_JSON);
        try {
            List<Score> scores = mapper.readValue(inputStream,typeReference);
            scoreService.saveLeaderboard(scores);
            System.out.println("Leaderboard Saved!");
        } catch (IOException e){
            System.out.println("Unable to save scores: " + e.getMessage());
        }
    }


}