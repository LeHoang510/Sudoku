package game.service;

import game.model.Score;
import game.repository.ScoreRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Getter
@Setter
@Service
public class ScoreService {
    private final ScoreRepository scoreRepository;

    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;

    }
    public Iterable<Score> getLeaderboard(){
        return scoreRepository.findAll();
    }
    public void saveLeaderboard(List<Score> scores){
        scoreRepository.saveAll(scores);
    }
}
